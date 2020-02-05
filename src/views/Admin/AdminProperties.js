import React,{useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// sections of this Page

import Table from "components/Table/Table";

import sectionsPageStyle from "assets/jss/material-kit-pro-react/views/sectionsPageStyle.js";

const useStyles = makeStyles(sectionsPageStyle);

export default function AdminEntities() {
  
  
  const classes = useStyles();
  const [entities, setEntities] = useState(null);
  let token = localStorage.getItem("token")

  useEffect(() => {
    fetch("/admin/entities", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(result => {
        setEntities(result.entities);
      });
  }, []);

  console.log(entities);
  return (
    <div>
      <div className={classes.main}>
       
      </div>
    </div>
  );
}
