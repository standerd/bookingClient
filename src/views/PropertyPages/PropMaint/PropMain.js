import React, { Component } from "react";
import "./propMaintain.css";
import CustomFileInput from "components/CustomFileInput/CustomFileInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import Footer from "components/Footer/Footer.js";

import image from "assets/img/land3.jpg";

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
    loading: false,
    uploading: false
  };

  // handles the change of image name when the user selects and image
  onImageChange = files => {
    this.setState({ files: files });
  };

  // date in change handler from calendar selector
  onDateChange = (name, value) => {
    if (name === "dateIn") {
      this.setState({ dateIn: moment(value, "DD-MM-YYYY") }, () => {
        Date.prototype.addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
        this.setState({
          dateOut: new Date(moment(this.state.dateIn, "DD-MM-YYYY")).addDays(1)
        });
      });
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
    this.setState({ updateError: false, loaded: false, loading: true });

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

    fetch(
      "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/maint/maintainDates",
      {
        headers: {
          Authorization: "Bearer " + token
        },
        method: "POST",
        body: formData
      }
    )
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
        this.setState({ loaded: true, loading: false });
      })
      .catch(err => {
        this.setState({ updateError: true, loading: false });
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

    fetch(
      "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/maint/uploadImg",
      {
        headers: {
          Authorization: "Bearer " + token
        },

        method: "POST",
        body: formData
      }
    )
      .then(res => res.json())
      .then(result =>
        this.setState({ preview: result.image, uploading: false })
      )
      .catch(err => console.log(err));
  };

  render() {
    let checkIn = this.state.dateIn;
    // let checkOutLimitMonth = checkIn.getMonth() + 1;
    // let checkInLimitMonth = today.getMonth() + 1;
    let yesterday = Datetime.moment().subtract(1, "day");

    let inLimit = function(current) {
      return current.isAfter(yesterday);
    };

    let outLimit = function(current) {
      return current.isAfter(moment(checkIn, "DD-MM-YYYY"));
    };

    return (
      <div
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          paddingTop: "7%",
          paddingBottom: "1%"
        }}
      >
        <div style={{ marginTop: "2px" }}></div>
        <div
          className="maintain"
          style={{
            backgroundColor: "rgb(0, 172, 193)",
            border: "1px solid white",
            borderRadius: "5px",
            padding: "5%"
          }}
        >
          <h1 style={{ color: "white" }}>Property Maintenance</h1>
          <div
            className="uploadImages"
            style={{
              backgroundColor: "white",
              border: "1px solid white",
              borderRadius: "5px"
            }}
          >
            <h4 style={{ color: "black" }}>
              Please Upload Images of Your Property Below
            </h4>
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
                  <Button
                    type="submit"
                    onClick={this.uploadImg}
                    style={{
                      backgroundColor: "rgb(0, 172, 193)",
                      fontWeight: "bold"
                    }}
                  >
                    {this.state.uploading ? "Uploading ...." : "Upload"}
                  </Button>
                </form>
              </GridItem>

              <GridItem xs={12} sm={6} md={6}>
                <img
                  width="500px"
                  height="auto"
                  src={
                    this.state.preview === ""
                      ? ""
                      : `http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/${this.state.preview}`
                  }
                  alt=""
                />
              </GridItem>
            </GridContainer>
          </div>
          <div
            className="availability"
            style={{
              backgroundColor: "white",
              border: "1px solid white",
              borderRadius: "5px"
            }}
          >
            <h4 style={{ color: "black" }}>
              Please Update Any Unavailable Dates
            </h4>

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
                    style={{ color: "white" }}
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
              <GridItem sm={3} md={3}></GridItem>
            </GridContainer>
            <form>
              <br></br>
              {this.state.updateError ? (
                <h2 style={{ color: "red" }}>
                  There are already bookings for these dates. Please review
                </h2>
              ) : null}
              {this.state.loaded ? (
                <h2 style={{ color: "green" }}>Dates successfully added</h2>
              ) : null}
              <Button
                type="submit"
                onClick={this.onDateSubmit}
                style={{
                  backgroundColor: "rgb(0, 172, 193)",
                  fontWeight: "bold"
                }}
              >
                {this.state.loading ? "Submitting ..." : "Submit Dates"}
              </Button>
              <br></br>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadImage;
