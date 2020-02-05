import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";

// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";

import suit1 from "assets/images/image1.jpg";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionProducts(props) {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  let bookingDisplay;
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    fetch("/search/myBookings", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(result => {
        setBookings(result.bookings);
      });
  }, []);

  console.log(bookings);

  bookings === null
    ? (bookingDisplay = null)
    : (bookingDisplay = bookings.map((key, index) => {
        return (
          <GridItem key={index} md={4} sm={4}>
            <Card plain product>
              <CardHeader noShadow image>
                <a href="#pablo">
                  <img src={suit1} alt=".." />
                </a>
              </CardHeader>
              <CardBody plain style={{ marginLeft: "1rem" }}>
                <h4 className={classes.cardTitle}>{key.entityName}</h4>
                <h4 className={classes.cardSubTitle}>
                  Destination: {key.destination}
                </h4>

                <p className={classes.description}>
                  Check In: {key.checkInDate}
                </p>
                <p className={classes.description}>
                  Check Out: {key.checkOutDate}
                </p>
                <p className={classes.description}>
                  Total Cost: {key.totalBookingCost}
                </p>
                <p className={classes.description}>Guests: {key.guestCount}</p>
              </CardBody>
              <CardFooter plain>
                <Tooltip
                  id="tooltip-top"
                  title="Manage Booking"
                  placement="left"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Link to="/manageBooking">
                    <Button
                      style={{ fontWeight: "bold" }}
                      size="sm"
                      type="button"
                      color="rose"
                      simple
                      id={key._id}
                    >
                      Manage Booking
                    </Button>
                  </Link>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="View Property"
                  placement="left"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Link to="/propContact" style={{ color: "#00acc1" }}>
                    <Button
                      style={{ fontWeight: "bold" }}
                      size="sm"
                      type="button"
                      color="rose"
                      simple
                      id={key.propertyId}
                    >
                      Property Details
                    </Button>
                  </Link>
                </Tooltip>
              </CardFooter>
            </Card>
          </GridItem>
        );
      }));

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <br></br>
        <br></br>
        <br></br>

        <h2 style={{ textAlign: "center" }}>My Bookings</h2>
        <GridContainer>
          <GridItem md={12} sm={12}>
            <GridContainer>{bookingDisplay}</GridContainer>
          </GridItem>
        </GridContainer>
        <br />
      </div>
    </div>
  );
}
