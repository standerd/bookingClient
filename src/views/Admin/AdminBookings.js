import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import Table from "components/Table/Table";
import sectionsPageStyle from "assets/jss/material-kit-pro-react/views/sectionsPageStyle.js";

const useStyles = makeStyles(sectionsPageStyle);

export default function AdminBookings() {
  const [bookings, setBookings] = useState(null);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/admin/bookings", {
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
  const classes = useStyles();
  return (
    <div>
      <div className={classes.main}></div>
    </div>
  );
}
