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
  const classes = useStyles();
  let yesterday = Datetime.moment().subtract(1, "day");
  var inLimit = function(current) {
    return current.isAfter(yesterday);
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
                      defaultValue="28/11/2019"
                      timeFormat={false}
                      isValidDate={inLimit}
                      closeOnSelect={true}
                      onChange={result => console.log(result)}
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
                      defaultValue="30/11/2019"
                      timeFormat={false}
                      isValidDate={inLimit}
                      closeOnSelect={true}
                      onChange={result => console.log(result)}
                      inputProps={{ placeholder: "From" }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem md={2} sm={2}>
                  <br />
                  <InputLabel className={classes.label}>Guests</InputLabel>
                  <FormControl fullWidth>
                    <CustomInput
                      labelText="# of"
                      id="material"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        min: 1,
                        value: props.noOfGuests,
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
                  <Button href="#pablo" color="info" round size="sm">
                    Submit Changes
                  </Button>
                  <p> Or</p>
                  <Button href="#pablo" color="rose" round size="sm">
                    Cancel Booking
                  </Button>
                </GridItem>
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
