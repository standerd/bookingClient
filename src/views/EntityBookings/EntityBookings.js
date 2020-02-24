import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import classNames from "classnames";

import Table from "components/Table/Table";
import sectionsPageStyle from "assets/jss/material-kit-pro-react/views/sectionsPageStyle.js";

import image from "assets/img/land3.jpg";

import "../Admin/cssSpinner.css";

const useStyles = makeStyles(sectionsPageStyle);

export default function AdminBookings() {
  const classes = useStyles();
  const [bookings, setBookings] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetch(
      "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/maint/bookings",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
      .then(res => res.json())
      .then(result => {
        console.log(result);
        let newArray = [];

        result.bookings.map(key => {
          return newArray.push([
            key.userId,
            new Date(key.bookingDate).toLocaleDateString(),
            key.checkInDate,
            key.checkOutDate,
            key.guestCount,
            `R ${key.totalBookingCost}.00`
          ]);
        });

        setBookings(newArray);
      });
  }, [token]);

  let display;

  bookings.length === 0
    ? (display = <div className="loader">Loading...</div>)
    : (display = (
        <Table
          tableHead={[
            "User",
            "Booking Date",
            "Check In",
            "Check Out",
            "Guests",
            "Cost"
          ]}
          tableData={bookings.length === 0 ? [] : bookings}
          customCellClasses={[
            classes.textLeft,
            classes.textLeft,
            classes.textLeft
          ]}
          customClassesForCells={[0, 4, 5]}
          customHeadCellClasses={[
            classes.textLeft,
            classes.textLeft,
            classes.textLeft
          ]}
          customHeadClassesForCells={[0, 4, 5]}
        />
      ));

  return (
    <div
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        paddingTop: "7%",
        height: "95vh"
      }}
    >
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: "2px", minHeight: "80vh" }}
      >
        <h1
          style={{ textAlign: "center", fontWeight: "bold", paddingTop: "2%" }}
        >
          Bookings Listing
        </h1>
        {display}
      </div>
    </div>
  );
}
