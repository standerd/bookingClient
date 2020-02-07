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
const product1 = "http://localhost:3001/images/image1.jpg";
const product3 = "http://localhost:3001/images/image2.jpg";
const product4 = "http://localhost:3001/images/image3.jpg";

const imagesArray = [product1, product4, product3];

const useStyles = makeStyles(productStyle);

export default function ProductPage(props) {
  const classes = useStyles();
  const images = imagesArray.map(key => {
    return { original: key, thumbnail: key };
  });

  console.log("Props given to details " + props.propDetails);
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
                      content: <p>{/* {props.propDetails.description} */}</p>
                    },
                    {
                      title: "Rates",
                      content: <p>Peak Rates: R 1 200.00 per night/room</p>
                    },
                    {
                      title: "Facilities",
                      content: (
                        <ul>
                          <li>Concierge Service</li>
                          <li>Free Wifi</li>
                          <li>Bicycle Rental</li>
                          <li>Room Service</li>
                          <li>Airport Transfer</li>
                          <li>Swimming Pool</li>
                          <li>Tea/Coffee Facilities</li>
                        </ul>
                      )
                    }
                  ]}
                />
                <GridContainer className={classes.pullRight}>
                  <Link to="/completeBooking">
                    <Button round color="rose">
                      Book Property &nbsp; <ShoppingCart />
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
