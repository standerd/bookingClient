import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Table from "components/Table/Table.js";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.js";

const useStyles = makeStyles(style);

export default function AdminUsers() {
  const classes = useStyles();
  const [users, setUsers] = useState(null);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/admin/users", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(result => {
        setUsers(result.users);
      });
  }, []);

  console.log(users);

  return (
    <div style={{ paddingTop: "80px", color: "#ccc" }}>
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>User Listing</h1>
      <Table
        tableHead={["Name", "E-Mail", "Tel No"]}
        tableData={[
          ["Andrew Mike", "Develop", "2013"],
          ["John Doe", "Design", "2012"],
          ["Alex Mike", "Design", "2010"]
        ]}
        customCellClasses={[
          classes.textCenter,
          classes.textRight,
          classes.textRight
        ]}
        customClassesForCells={[0, 4, 5]}
        customHeadCellClasses={[
          classes.textCenter,
          classes.textRight,
          classes.textRight
        ]}
        customHeadClassesForCells={[0, 4, 5]}
      />
    </div>
  );
}
