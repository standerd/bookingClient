import React from "react";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";

// @material-ui icons
import Favorite from "@material-ui/icons/Flight";

//Maps Import

import Map from "../../../components/Maps/Maps";

// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import suit1 from "assets/images/image1.jpg";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionProducts(props) {
  const classes = useStyles();
  let property;

  props.markerArray === null
    ? (property = (
        <h3 style={{ textAlign: "center", color: "red", margin: "0 auto" }}>
          No Properties Found
        </h3>
      ))
    : (property = props.markerArray.map(key => {
        return (
          <GridItem key={key._id} md={4} sm={4}>
            <Card plain product>
              <CardHeader noShadow image>
                <a href="#pablo">
                  <img src={suit1} alt=".." />
                </a>
              </CardHeader>
              <CardBody plain>
                <h4 className={classes.cardTitle}>{key.name}</h4>

                <p className={classes.description}>{key.description}</p>
              </CardBody>
              <CardFooter plain className={classes.justifyContentBetween}>
                <div className={classes.priceContainer}>
                  <span className={classes.price}>
                    {" "}
                    R {key.rates} per Night
                  </span>
                </div>
                <Tooltip
                  id="tooltip-top"
                  title="Go To Property"
                  placement="left"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Link to="/propDetails" style={{ color: "#00acc1" }}>
                    <Favorite style={{ fontSize: "1.3rem" }} />
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
        <h2 style={{ textAlign: "center" }}>Map View</h2>
        <GridContainer>
          <GridItem md={12} sm={12}>
            <Map
              zoom={props.zoom}
              initialLat={props.initialLat}
              initialLng={props.initialLng}
              markerArray={props.markerArray}
              selected={props.selected}
              propsName={props.propsName}
              propsLat={props.propsLat}
              propsLng={props.propsLng}
              openWindow={props.openWindow}
              closeWindow={props.closeWindow}
              showInfo={props.showInfo}
            />
          </GridItem>
        </GridContainer>
        <br />
        <h2 style={{ textAlign: "center" }}>Property Listing</h2>
        <GridContainer>
          <GridItem md={12} sm={12}>
            <GridContainer>{property}</GridContainer>
          </GridItem>
        </GridContainer>
        <br />
      </div>
    </div>
  );
}
