/*eslint-disable*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// images

const useStyles = makeStyles(productStyle);

export default function ProductPage(props) {
  let imagesArray = [];

  props.propDetails !== null ? (imagesArray = props.propDetails.images) : [];

  const classes = useStyles();
  const images = imagesArray.map(key => {
    return { original: `http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/${key}`, thumbnail: `http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/${key}` };
  });

  let facilities;

  props.propDetails === null
    ? (facilities = <li>No Facilities Loaded</li>)
    : (facilities = props.propDetails.facilities.map(key => (
        <li key={key}>{key}</li>
      )));

  
  return (
    <div className={classes.productPage}>
      <Header
        brand="Traveller"
        links={<HeaderLinks dropdownHoverColor="rose" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "info"
        }}
      />
      <Parallax
        image={require("assets/img/landing.jpg")}
        filter="info"
        className={classes.pageHeader}
      ></Parallax>
      <div className={classNames(classes.section, classes.sectionGray)}>
        <div className={classes.container}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer>
              <GridItem md={6} sm={6}>
                <ImageGallery
                  showFullscreenButton={false}
                  showPlayButton={false}
                  startIndex={0}
                  items={images}
                />
              </GridItem>
              <GridItem md={6} sm={6}>
                <h2 className={classes.title}>Hotel Transalvania</h2>
                <Accordion
                  active={0}
                  activeColor="rose"
                  collapses={[
                    {
                      title: "Description",
                      content: (
                        <p>
                          {props.propDetails === null
                            ? "No Description"
                            : props.propDetails.description}
                        </p>
                      )
                    },
                    {
                      title: "Rates",
                      content: (
                        <p>
                          Rates: R{" "}
                          {props.propDetails === null
                            ? "No Rates Loaded"
                            : props.propDetails.rates}
                          .00 per night/room
                        </p>
                      )
                    },
                    {
                      title: "Facilities",
                      content: <ul>{facilities}</ul>
                    }
                  ]}
                />
                <GridContainer className={classes.pullRight}>
                  <Link to="/completeBooking">
                    <Button round color="rose" style={{ marginRight: "12px" }}>
                      Book &nbsp; <ShoppingCart />
                    </Button>
                  </Link>
                </GridContainer>
              </GridItem>
            </GridContainer>
            <br></br>
            <Link
              className={classes.center}
              style={{ color: "#00acc1", fontWeight: "bold" }}
              to="/searchResults"
            >
              Back to Search
            </Link>
          </div>
        </div>
      </div>
      <Footer
        className={classes.footer}
        content={
          <div>
            <div className={classes.center}>
              &copy; {1900 + new Date().getYear()} , MERN Development{" "}
            </div>
          </div>
        }
      />
    </div>
  );
}
