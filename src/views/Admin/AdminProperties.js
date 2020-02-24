import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import "./cssSpinner.css";
// @material-ui/icons
// sections of this Page

import Table from "components/Table/Table";
import image from "assets/img/land3.jpg";

import sectionsPageStyle from "assets/jss/material-kit-pro-react/views/sectionsPageStyle.js";

const useStyles = makeStyles(sectionsPageStyle);

export default function AdminEntities() {
  const classes = useStyles();
  const [entities, setentities] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetch(
      "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/admin/entities",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
      .then(res => res.json())
      .then(result => {
        let newArray = [];

        result.entities.map(key => {
          return newArray.push([
            key._id,
            key.name,
            key.city,
            key.country,
            key.telNo,
            key.email
          ]);
        });

        setentities(newArray);
      });
  }, [token]);

  let display;

  entities.length === 0
    ? (display = <div className="loader">Loading...</div>)
    : (display = (
        <Table
          tableHead={["ID", "Name", "City", "Country", "Contact", "Email"]}
          tableData={entities.length === 0 ? [] : entities}
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
        <br />
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
          Entity Listing
        </h1>
        {display}
      </div>
    </div>
  );
}
