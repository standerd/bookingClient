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
import Button from "components/CustomButtons/Button.js";

import suit1 from "assets/images/image1.jpg";
import suit2 from "assets/images/image2.jpg";
import suit3 from "assets/images/image3.jpg";
import suit4 from "assets/images/image4.jpg";
import suit5 from "assets/images/image5.jpg";
import suit6 from "assets/images/image6.jpg";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionProducts() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2 style={{ textAlign: "center" }}>Map View</h2>
        <GridContainer>
          <GridItem md={12} sm={12}>
            <Map />
          </GridItem>
        </GridContainer>
        <br />
        <h2 style={{ textAlign: "center" }}>Property Listing</h2>
        <GridContainer>
          <GridItem md={12} sm={12}>
            <GridContainer>
              <GridItem md={4} sm={4}>
                <Card plain product>
                  <CardHeader noShadow image>
                    <a href="#pablo">
                      <img src={suit1} alt=".." />
                    </a>
                  </CardHeader>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>Hotel Transalvania</h4>

                    <p className={classes.description}>
                      Hotel Transalvania is Located within walking distance from
                      the beach and has various options for dining available
                      both on site as well as various restaurants within close
                      walking distance. We serve a great breakfast, and out
                      staff is always willing to assist with whatever assistance
                      you require.
                    </p>
                  </CardBody>
                  <CardFooter plain className={classes.justifyContentBetween}>
                    <div className={classes.priceContainer}>
                      <span className={classes.price}> €800 per Night</span>
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
              <GridItem md={4} sm={4}>
                <Card plain product>
                  <CardHeader noShadow image>
                    <a href="#pablo">
                      <img src={suit2} alt=".." />
                    </a>
                  </CardHeader>
                  <CardBody plain>
                    <a href="#pablo">
                      <h4 className={classes.cardTitle}>Wooyoungmi</h4>
                    </a>
                    <p className={classes.description}>
                      Dark-grey slub wool, pintucked notch lapels.
                    </p>
                  </CardBody>
                  <CardFooter plain className={classes.justifyContentBetween}>
                    <div className={classes.priceContainer}>
                      <span className={classes.price}> €555</span>
                    </div>
                    <Tooltip
                      id="tooltip-top"
                      title="Go To Property"
                      placement="left"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        justIcon
                        simple
                        color="info"
                        className={classes.pullRight}
                      >
                        <Favorite />
                      </Button>
                    </Tooltip>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem md={4} sm={4}>
                <Card plain product>
                  <CardHeader noShadow image>
                    <a href="#pablo">
                      <img src={suit3} alt=".." />
                    </a>
                  </CardHeader>
                  <CardBody plain>
                    <a href="#pablo">
                      <h4 className={classes.cardTitle}>Tom Ford</h4>
                    </a>
                    <p className={classes.description}>
                      Immaculate tailoring is TOM FORD{"'"}s forte.
                    </p>
                  </CardBody>
                  <CardFooter plain className={classes.justifyContentBetween}>
                    <div className={classes.priceContainer}>
                      <span className={classes.price}> €879</span>
                    </div>
                    <Tooltip
                      id="tooltip-top"
                      title="Go To Property"
                      placement="left"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        justIcon
                        simple
                        color="info"
                        className={classes.pullRight}
                      >
                        <Favorite />
                      </Button>
                    </Tooltip>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem md={4} sm={4}>
                <Card plain product>
                  <CardHeader noShadow image>
                    <a href="#pablo">
                      <img src={suit4} alt=".." />
                    </a>
                  </CardHeader>
                  <CardBody plain>
                    <a href="#pablo">
                      <h4 className={classes.cardTitle}>Thom Sweeney</h4>
                    </a>
                    <p className={classes.description}>
                      It{"'"}s made from lightweight grey wool woven.
                    </p>
                  </CardBody>
                  <CardFooter plain className={classes.justifyContentBetween}>
                    <div className={classes.priceContainer}>
                      <span className={classes.price}> €680</span>
                    </div>
                    <Tooltip
                      id="tooltip-top"
                      title="Go To Property"
                      placement="left"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        justIcon
                        simple
                        color="info"
                        className={classes.pullRight}
                      >
                        <Favorite />
                      </Button>
                    </Tooltip>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem md={4} sm={4}>
                <Card plain product>
                  <CardHeader noShadow image>
                    <a href="#pablo">
                      <img src={suit5} alt=".." />
                    </a>
                  </CardHeader>
                  <CardBody plain>
                    <a href="#pablo">
                      <h4 className={classes.cardTitle}>Kingsman</h4>
                    </a>
                    <p className={classes.description}>
                      Crafted from khaki cotton and fully canvassed.
                    </p>
                  </CardBody>
                  <CardFooter plain className={classes.justifyContentBetween}>
                    <div className={classes.priceContainer}>
                      <span className={classes.price}> €725</span>
                    </div>
                    <Tooltip
                      id="tooltip-top"
                      title="Go To Property"
                      placement="left"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        justIcon
                        simple
                        color="info"
                        className={classes.pullRight}
                      >
                        <Favorite />
                      </Button>
                    </Tooltip>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem md={4} sm={4}>
                <Card plain product>
                  <CardHeader noShadow image>
                    <a href="#pablo">
                      <img src={suit6} alt=".." />
                    </a>
                  </CardHeader>
                  <CardBody plain>
                    <a href="#pablo">
                      <h4 className={classes.cardTitle}>Boglioli</h4>
                    </a>
                    <p className={classes.description}>
                      Masterfully crafted in Northern Italy.
                    </p>
                  </CardBody>
                  <CardFooter plain className={classes.justifyContentBetween}>
                    <div className={classes.priceContainer}>
                      <span className={classes.price}> €699</span>
                    </div>
                    <Tooltip
                      id="tooltip-top"
                      title="Go To Property"
                      placement="left"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        justIcon
                        simple
                        color="info"
                        className={classes.pullRight}
                      >
                        <Favorite />
                      </Button>
                    </Tooltip>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <br />
      </div>
    </div>
  );
}
