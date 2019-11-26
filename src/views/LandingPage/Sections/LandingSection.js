import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import cardsStyle from "assets/jss/material-kit-pro-react/views/presentationSections/cardsStyle.js";
import GoogleSearch from "../../../components/googleSearch/newSearch";
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import People from "@material-ui/icons/People";

//React dateTime moment import and long date format set
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

const useStyles = makeStyles(cardsStyle, style);

export default function SectionCards(props) {
  const classes = useStyles();

  let yesterday = Datetime.moment().subtract(1, "day");
  var inLimit = function(current) {
    return current.isAfter(yesterday);
  };

  return (
    <div className={classNames(classes.section, classes.sectionLight)}>
      <div style={{ height: "auto" }} className={classes.container}>
        <h3 style={{ color: "black" }} className={classes.title}>
          Search For Accomodation
        </h3>
        <GridContainer>
          <GridItem md={4} sm={4}>
            <br />
            <InputLabel className={classes.label}>Travelling To</InputLabel>
            <br />
            <div style={{ borderBottom: " 1px solid #ccc" }}>
              <GoogleSearch
                handleChange={props.handleChange}
                address={props.city}
              />
            </div>
          </GridItem>
          <GridItem md={2} sm={2}>
            <br />
            <InputLabel className={classes.label}>Check In Date</InputLabel>
            <br />
            <FormControl fullWidth>
              <Datetime
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
            <InputLabel className={classes.label}>Check Out Date</InputLabel>
            <br />
            <FormControl fullWidth>
              <Datetime
                timeFormat={false}
                isValidDate={inLimit}
                closeOnSelect={true}
                utc={false}
                inputProps={{ placeholder: "To" }}
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
            <br />
            <FormControl fullWidth>
              <br />
              <Link to="/searchResults">
                <Button type="button" color="info">
                  Search
                </Button>
              </Link>
            </FormControl>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
