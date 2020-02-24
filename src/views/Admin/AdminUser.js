import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import "./cssSpinner.css";

// core components
import Table from "components/Table/Table.js";
import image from "assets/img/land3.jpg";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";

const useStyles = makeStyles(style);

export default function AdminUsers() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetch(
      "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/admin/users",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
      .then(res => res.json())
      .then(result => {
        let newArray = [];

        result.users.map(key => {
          return newArray.push([
            key.name,
            key.email,
            key.telNo,
            key.isAdmin ? "Yes" : "No",
            key.propId ? "Yes" : "No",
            key.validated ? "Yes" : "No"
          ]);
        });

        setUsers(newArray);
      });
  }, [token]);

  let display;

  users.length === 0
    ? (display = <div className="loader">Loading...</div>)
    : (display = (
        <Table
          tableHead={[
            "Name",
            "E-Mail",
            "Tel No",
            "Admin",
            "Property",
            "Validated"
          ]}
          tableData={users.length === 0 ? [] : users}
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
        style={{
          marginTop: "2px",
          minHeight: "80vh",
          backgroundColor: " white"
        }}
      >
        <br />
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            paddingTop: "10px"
          }}
        >
          User Listing
        </h1>
        {display}
      </div>
    </div>
  );
}
