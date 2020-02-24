import React from "react";
import { Link } from "react-router-dom";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Datetime from "react-datetime";
// @material-ui/core components

import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import People from "@material-ui/icons/People";
import { makeStyles } from "@material-ui/core/styles";

import pricingStyle from "assets/jss/material-kit-pro-react/views/pricingSections/pricingStyle.js";

//react date time picker format
const style = {
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0"
  }
};

const useStyles = makeStyles(pricingStyle, style);

let moment = require("moment");
moment.updateLocale("en", {
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "DD/MM/YYYY",
    l: "DD/MM/YYYY",
    LL: "MMMM Do YYYY",
    ll: "MMM D YYYY",
    LLL: "MMMM Do YYYY LT",
    lll: "MMM D YYYY LT",
    LLLL: "dddd, MMMM Do YYYY LT",
    llll: "ddd, MMM D YYYY LT"
  }
});

export default function SectionPricing(props) {
  let occupation = [];
  const classes = useStyles();

  const [initialIn, setInitialIn] = React.useState();
  const [initialOut, setInitialOut] = React.useState();
  const [guests, setGuests] = React.useState();
  const [oldIn, setOldIn] = React.useState();
  const [oldOut, setOldOut] = React.useState();
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [unavailable, setUnavailable] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [success2, setSuccess2] = React.useState(false);
  const [processing2, setProcessing2] = React.useState(false);

  React.useEffect(() => {
    setInitialIn(props.booking.checkInDate);
    setInitialOut(props.booking.checkOutDate);
    setOldIn(props.booking.checkInDate);
    setOldOut(props.booking.checkOutDate);
    setGuests(props.booking.guestCount);
  }, [props.booking]);

  let yesterday = Datetime.moment().subtract(1, "day");

  var inLimit = function(current) {
    return current.isAfter(yesterday);
  };
  var outLimit = function(current) {
    return current.isAfter(moment(initialIn, "DD-MM-YYYY"));
  };

  const deleteBooking = () => {
    setProcessing2(true);
    let myFirstDate = new Date(moment(initialIn, "DD-MM-YYYY"));
    let myLastDate = new Date(moment(initialOut, "DD-MM-YYYY"));
    let duration = parseInt((myLastDate - myFirstDate) / (1000 * 3600 * 24));

    for (let i = 0; i < duration; i++) {
      let myDate = myFirstDate.toLocaleDateString();
      occupation.push(myDate);
      myFirstDate = new Date(myFirstDate.setDate(myFirstDate.getDate() + 1));
    }

    fetch(
      "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/search/removeBooking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookingID: props.booking._id,
          occupation: occupation,
          entityID: props.booking.propertyId
        })
      }
    ).then(res => {
      setProcessing2(false);
      setSuccess2(true);
    });
  };

  const ammendBooking = () => {
    setProcessing(true);
    let currentOcc = [];

    let currentIn = new Date(moment(oldIn, "DD-MM-YYYY"));
    let currentOut = new Date(moment(oldOut, "DD-MM-YYYY"));
    let currDur = parseInt((currentOut - currentIn) / (1000 * 3600 * 24));

    for (let i = 0; i < currDur; i++) {
      let myDate2 = currentIn.toLocaleDateString();
      currentOcc.push(myDate2);
      currentIn = new Date(currentIn.setDate(currentIn.getDate() + 1));
    }

    //for the ammending of the booking the entity which held the booking has to have their availability
    //updated, the below function puts the full date range in an array that get sent to the server to update.
    let occupation = [];

    let myFirstDate = new Date(moment(initialIn, "DD-MM-YYYY"));
    let myLastDate = new Date(moment(initialOut, "DD-MM-YYYY"));
    let duration = parseInt((myLastDate - myFirstDate) / (1000 * 3600 * 24));

    for (let i = 0; i < duration; i++) {
      let myDate = myFirstDate.toLocaleDateString();
      occupation.push(myDate);
      myFirstDate = new Date(myFirstDate.setDate(myFirstDate.getDate() + 1));
    }

    //fetch request is sent to the server to ammend the booking
    fetch(
      "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/search/ammendBooking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookingID: props.booking._id,
          occupation: occupation,
          currentOcc: currentOcc,
          duration: duration,
          checkIn: initialIn,
          checkOut: initialOut,
          guestCount: guests,
          entityID: props.booking.propertyId
        })
      }
    )
      .then(res => {
        if (res.status === 404) {
          setUnavailable(true);
          setProcessing(false);
          setSuccess(false);
          throw new Error();
        } else if (res.status === 500) {
          setError(true);
          throw new Error();
        }
        return res.json();
      })

      .then(resData => {
        setError(false);
        setProcessing(false);
        setSuccess(true);
        setUnavailable(false);
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
  };

  const onDateChange = (name, value) => {
    if (name === "dateIn") {
      setInitialIn(value.toLocaleDateString());
      Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      setInitialOut(new Date(moment(initialIn, "DD-MM-YYYY")).addDays(1));
    } else {
      setInitialOut(value.toLocaleDateString());
    }
  };

  const changeGuests = e => {
    setGuests(e.target.value);
  };

  return (
    <div className={classes.pricingSection}>
      <h2 className={classes.title}>Ammend Booking Details</h2>
      <h5 style={{ color: "#e91e63", fontSize: "1rem" }}>
        Kindly note that you are only able to ammend your travel dates and guest
        count at present. If you wish to change the property or destination
        please cancel your current booking and make a new booking.
      </h5>
      <GridContainer>
        <GridItem md={2} sm={2}></GridItem>
        <GridItem md={8} sm={8}>
          <Card plain pricing>
            <h4 style={{ fontWeight: "bold" }}>Please Select Below</h4>
            <CardBody pricing>
              <GridContainer>
                <GridItem md={4} sm={4}>
                  <br />
                  <InputLabel className={classes.label}>
                    Check In Date
                  </InputLabel>
                  <br />
                  <FormControl fullWidth>
                    <Datetime
                      value={initialIn}
                      timeFormat={false}
                      isValidDate={inLimit}
                      closeOnSelect={true}
                      onChange={result => onDateChange("dateIn", result._d)}
                      inputProps={{ placeholder: "From" }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem md={4} sm={4}>
                  <br />
                  <InputLabel className={classes.label}>
                    Check In Date
                  </InputLabel>
                  <br />
                  <FormControl fullWidth>
                    <Datetime
                      value={initialOut}
                      timeFormat={false}
                      isValidDate={outLimit}
                      closeOnSelect={true}
                      onChange={result => onDateChange("dateOut", result._d)}
                      inputProps={{ placeholder: "From" }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem md={2} sm={2}>
                  <br />
                  <InputLabel className={classes.label}>Guests</InputLabel>
                  <FormControl fullWidth>
                    <CustomInput
                      id="material"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        min: 1,
                        value: guests,
                        onChange: changeGuests,
                        endAdornment: (
                          <InputAdornment position="end">
                            <People />
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem md={2} sm={2}>
                  <br></br>
                  <br></br>
                  <Button onClick={ammendBooking} color="info" round size="sm">
                    {processing ? "Processing ..." : "Submit Changes"}
                  </Button>
                  <p> Or</p>
                  <Button onClick={deleteBooking} color="rose" round size="sm">
                    {processing2 ? "Processing ..." : "Cancel Booking"}
                  </Button>
                </GridItem>
                <h4 style={{ color: "green" }}>
                  {success
                    ? "Change processed successfully, please click on the left to go back to bookings"
                    : null}
                </h4>
                <h4 style={{ color: "green" }}>
                  {success2
                    ? "Booking Deleted successfully, please click on the left to go back to bookings"
                    : null}
                </h4>
                <h4 style={{ color: "red" }}>
                  {unavailable
                    ? "Dates are not available, please select different dates or make a new booking"
                    : null}
                </h4>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md={1} sm={1}>
          <Card plain pricing></Card>
        </GridItem>

        <Link style={{ color: "#e91e63", fontWeight: "bold" }} to="/bookings">
          Back To Bookings
        </Link>
      </GridContainer>
    </div>
  );
}
