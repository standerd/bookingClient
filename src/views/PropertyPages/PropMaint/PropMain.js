import React, { Component } from "react";
import "./propMaintain.css";
import CustomFileInput from "components/CustomFileInput/CustomFileInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";

//entity can maintain their availability and upload images after registration.

let moment = require("moment");
moment.updateLocale("en", {
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "DD/MM/YYYY",
    l: "DD/MM/YYYY",
    LL: "Do MMMM YYYY",
    ll: "D MMM YYYY",
    LLL: "Do MMMM YYYY LT",
    lll: "D MMM YYYY LT",
    LLLL: "dddd, MMMM Do YYYY LT",
    llll: "ddd, MMM D YYYY LT"
  }
});

class UploadImage extends Component {
  state = {
    files: "",
    preview: "",
    dateIn: "",
    dateOut: "",
    updateError: false,
    loaded: false,
    uploading: false
  };

  // handles the change of image name when the user selects and image
  onImageChange = files => {
    this.setState({ files: files });
  };

  // date in change handler from calendar selector
  onDateChange = (name, value) => {
    if (name === "dateIn") {
      this.setState({ dateIn: moment(value, "DD-MM-YYYY"), dateOut: "" });
    } else {
      this.setState({ dateOut: moment(value, "DD-MM-YYYY") });
    }
  };

  //dates are submitted to the database to be written into the availability field.

  //date submit function, submits request to the server to update, server does a check to see if
  //dates are not booked and responds with OK or error message.
  onDateSubmit = e => {
    e.preventDefault();
    let occupation = [];
    let token = localStorage.getItem("token");
    //on resubmit of the button the errors are reset.
    this.setState({ updateError: false, loaded: false });

    //set the date range that is included as an array with the request to the server.
    let myFirstDate = new Date(this.state.dateIn);
    let myLastDate = new Date(this.state.dateOut);
    let duration = parseInt((myLastDate - myFirstDate) / (1000 * 3600 * 24));

    for (let i = 0; i < duration; i++) {
      let myDate = myFirstDate.toLocaleDateString();
      occupation.push(myDate);
      myFirstDate = new Date(myFirstDate.setDate(myFirstDate.getDate() + 1));
    }

    //sending Auth header so the data array is sent as a formData object.
    const formData = new FormData();
    formData.append("dateRange", occupation);

    fetch("/maint/maintainDates", {
      headers: {
        Authorization: "Bearer " + token
      },
      method: "POST",
      body: formData
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("No availability");
        }
        return res.json();
      })
      .then(result => {
        this.setState({ loaded: true });
      })
      .catch(err => {
        this.setState({ updateError: true });
      });
  };

  // upload image handler, shows a img preview on click of the uploaded image to
  // confirm succesfull upload.
  uploadImg = e => {
    e.preventDefault();
    this.setState({ uploading: true });
    let token = localStorage.getItem("token");

    // cannot send send images in application/json, so a new form object
    // is created to send the file data with the other normal body data.
    const formData = new FormData();
    formData.append("image", this.state.files);

    fetch("/maint/uploadImg", {
      headers: {
        Authorization: "Bearer " + token
      },

      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(result =>
        this.setState({ preview: result.image, uploading: false })
      )
      .catch(err => console.log(err));
  };

  render() {
    let today = new Date();
    let checkIn = this.state.dateIn;
    // let checkOutLimitMonth = checkIn.getMonth() + 1;
    // let checkInLimitMonth = today.getMonth() + 1;
    let day;
    let checkDay;
    let yesterday = Datetime.moment().subtract(1, "day");

    console.log(checkIn);
    let inLimit = function(current) {
      return current.isAfter(yesterday);
    };

    let outLimit = function(current) {
      return current.isAfter(moment(checkIn, "DD-MM-YYYY"));
    };

    // today.getDate() < 10
    //   ? (day = "0" + today.getDate())
    //   : (day = today.getDate().toString());
    // checkIn.getDate() < 10
    //   ? (checkDay = "0" + (checkIn.getDate() + 1))
    //   : (checkDay = checkIn.getDate() + 1);

    //first check if the months are single digits, if so a leading zero is added. and the date
    // is contructed in the format expected by the HTML input calendar.
    // checkInLimitMonth < 10
    //   ? (checkInLimit =
    //       today.getFullYear() +
    //       "-0" +
    //       checkInLimitMonth +
    //       "-" +
    //       today.getDate())
    //   : (checkInLimit =
    //       today.getFullYear() + "-" + checkInLimitMonth + "-" + day);

    // checkOutLimitMonth < 10
    //   ? (checkOutLimit =
    //       checkIn.getFullYear() + "-0" + checkOutLimitMonth + "-" + checkDay)
    //   : (checkOutLimit =
    //       checkIn.getFullYear() + "-" + checkOutLimitMonth + "-" + checkDay);

    return (
      <div className="maintain">
        <h1>Upload Images or Maintain Availability Of Your Property</h1>
        <div className="uploadImages">
          <h4>Please Upload Images of Your Property Below</h4>
          <GridContainer>
            <GridItem xs={1} sm={2} md={2}></GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <form>
                <CustomFileInput
                  myFunction={this.onImageChange}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    placeholder: "Please Select a Image"
                  }}
                />
                <Button type="submit" onClick={this.uploadImg}>
                  Upload
                </Button>
                {this.state.uploading ? (
                  <h3 style={{ color: "green" }}>
                    Image Uploading Please Be Patient
                  </h3>
                ) : null}
              </form>
            </GridItem>

            <GridItem xs={12} sm={6} md={6}>
              <img
                width="500px"
                height="auto"
                src={this.state.preview === "" ? "" : this.state.preview}
                alt=""
              />
            </GridItem>
          </GridContainer>
        </div>
        <div className="availability">
          <h4>Please Update Your Availability For Any Manual Bookings</h4>
          <h4>Or Other Unavailable Dates</h4>
          <GridContainer>
            <GridItem xs={1} sm={3} md={3}></GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <FormControl fullWidth style={{ color: "black" }}>
                <Datetime
                  timeFormat={false}
                  isValidDate={inLimit}
                  closeOnSelect={true}
                  value={this.state.dateIn}
                  name="dateFrom"
                  onChange={result => this.onDateChange("dateIn", result._d)}
                  inputProps={{ placeholder: "Date From" }}
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <FormControl fullWidth style={{ color: "black" }}>
                <Datetime
                  timeFormat={false}
                  isValidDate={outLimit}
                  closeOnSelect={true}
                  value={this.state.dateOut}
                  name="dateTo"
                  onChange={result => this.onDateChange("dateOut", result._d)}
                  inputProps={{ placeholder: "Date To" }}
                />
              </FormControl>
            </GridItem>
            <GridItem xs={0} sm={3} md={3}></GridItem>
          </GridContainer>
          <form>
            {/* <label htmlFor="dateFrom">Date From</label>
            <input
              name="dateFrom"
              type="date"
              value={this.state.dateIn}
              min={checkInLimit.toString()}
              onChange={this.onDateInChange}
            />
            <label htmlFor="dateTo">Date To</label> */}
            {/* <input
              name="dateTo"
              type="date"
              onChange={this.onDateOutChange}
              value={this.state.dateOut}
              min={checkOutLimit.toString()}
            /> */}
            <br></br>
            {this.state.updateError ? (
              <h2 style={{ color: "red" }}>
                There are already bookings for these dates. Please review
              </h2>
            ) : null}
            {this.state.loaded ? (
              <h2 style={{ color: "green" }}>Dates successfully added</h2>
            ) : null}
            <Button type="submit" onClick={this.onDateSubmit}>
              Submit Dates
            </Button>
            <br></br>
          </form>
        </div>
      </div>
    );
  }
}

export default UploadImage;
