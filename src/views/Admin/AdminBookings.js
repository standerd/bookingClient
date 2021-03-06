import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
// @material-ui/icons
import Footer from "components/Footer/Footer.js";
import Table from "components/Table/Table";
import sectionsPageStyle from "assets/jss/material-kit-pro-react/views/sectionsPageStyle.js";
import image from "assets/img/land3.jpg";
import "./cssSpinner.css";

const useStyles = makeStyles(sectionsPageStyle);

export default function AdminBookings() {
  const classes = useStyles();
  const [bookings, setBookings] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetch(
      "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/admin/bookings",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
      .then(res => res.json())
      .then(result => {
        let newArray = [];

        result.bookings.map(key => {
          return newArray.push([
            key.propertyId,
            key.userId,
            new Date(key.bookingDate).toLocaleDateString(),
            key.checkOutDate,
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
          tableHead={["Entity", "User", "Booking Date", "Check Out", "Cost"]}
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
        paddingTop: "10%",
        paddingBottom: "5%",
        height: "95vh"
      }}
    >
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: "2px", minHeight: "80vh" }}
      >
        <br />
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            paddingTop: "10px"
          }}
        >
          Bookings Listing
        </h1>
        {display}
      </div>
      <Footer
        style={{ color: "white", paddingTop: "1%" }}
        content={
          <div>
            <div>&copy; {1900 + new Date().getYear()} , MERN Development </div>
          </div>
        }
      />
    </div>
  );
}
