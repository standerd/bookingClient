/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";
import "../Admin/cssSpinner.css";

const useStyles = makeStyles(shoppingCartStyle);

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

export default function ShoppingCartPage(props) {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();

  let myFirstDate = new Date(moment(props.dateIn, "DD-MM-YYYY"));
  let myLastDate = new Date(moment(props.dateOut, "DD-MM-YYYY"));
  let duration = parseInt((myLastDate - myFirstDate) / (1000 * 3600 * 24));

  let totalCost = parseInt("1200") * duration;

  console.log(duration + " and " + typeof duration);

  let bookingScreen = (
    <div className={classes.container}>
      <Card plain>
        <CardBody plain>
          <h3 className={classes.cardTitle}>Booking Details</h3>
          <Table
            tableHead={[
              "",
              "PROPERTY",
              "CHECK IN",
              "CHECK OUT",
              "GUESTS",
              "NIGHTS",
              "PER NIGHT"
            ]}
            tableData={[
              [
                <div className={classes.imgContainer} key={1}>
                  <img
                    src={`http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/${props.bookingDetails.images[0]}`}
                    alt="..."
                    className={classes.img}
                  />
                </div>,
                <span key={1}>
                  {props.bookingDetails === null
                    ? null
                    : props.bookingDetails.name}
                  <br />
                  <small className={classes.tdNameSmall}>{props.city}</small>
                </span>,
                props.dateIn,
                props.dateOut,
                <span key={1}>{props.guests}</span>,
                <span key={1}>{duration}</span>,
                <span key={1}>R {props.bookingDetails.rates}.00</span>
              ],

              {
                purchase: true,
                colspan: 3,
                amount: <span>R{totalCost}.00</span>,
                col: {
                  colspan: 2,
                  text: (
                    <Button color="info" round onClick={props.confirmBooking}>
                      {props.buttonText} <KeyboardArrowRight />
                    </Button>
                  )
                }
              }
            ]}
            tableShopping
            customHeadCellClasses={[
              classes.textCenter,
              classes.description,
              classes.description,
              classes.textRight,
              classes.textRight,
              classes.textRight
            ]}
            customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
            customCellClasses={[
              classes.tdName,
              classes.customFont,
              classes.customFont,
              classes.tdNumber,
              classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
              classes.tdNumber + " " + classes.textRight
            ]}
            customClassesForCells={[1, 2, 3, 4, 5, 6]}
          />
        </CardBody>
      </Card>
    </div>
  );

  let confirmBooking = (
    <div className={classes.container}>
      <h3>Thanks for your Booking</h3>
      <h3>Your Booking Ref Is : {props.bookingNumber}</h3>
    </div>
  );

  return (
    <div>
      <Header
        brand="Traveller"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 300,
          color: "info"
        }}
      />

      <Parallax image={require("assets/img/land4.jpg")} filter="dark" xsmall>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h2 className={classes.title}>You're Almost There</h2>
              <h4>Finalise Your Booking</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div
        style={{ padding: "2%" }}
        className={classNames(classes.main, classes.mainRaised)}
      >
        {props.bookingNumber === null ? bookingScreen : confirmBooking}
      </div>
      <br />
      <Footer
        className={classes.footer}
        content={
          <div>
            <div className={classes.center}>
              &copy; {1900 + new Date().getYear()} , MERN Development{" "}
            </div>
          </div>
        }
      />
    </div>
  );
}
