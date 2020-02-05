/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Footer from "components/Footer/Footer.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionSearchResults from "./Sections/SectionSearchResults";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import ecommerceHeader from "assets/img/land2.jpg";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceStyle.js";

const useStyles = makeStyles(styles);

export default function EcommercePage(props) {
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Traveller"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="white"
        changeColorOnScroll={{
          height: 400,
          color: "info"
        }}
      />
      <Parallax image={require("assets/img/land2.jpg")} filter="dark" small>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <div className={classes.brand}>
                <h1 className={classes.title}>You're One Step Closer</h1>
                <h4 className={classes.title}>To An Amazing Holiday</h4>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionSearchResults
          markerArray={props.markerArray}
          initialLat={props.initialLat}
          initialLng={props.initialLng}
          zoom={props.zoom}
          selected={props.selected}
          dateIn={props.dateIn}
          dateOut={props.dateOut}
          amendSearch={props.amendSearch}
          auth={props.isAuth}
          openWindow={props.openWindow}
          closeWindow={props.closeWindow}
          showInfo={props.showInfo}
          propsName={props.propsName}
          propsLat={props.propsLat}
          propsLng={props.propsLng}
        />
      </div>
      <div
        className={classNames(
          classes.subscribeLine,
          classes.subscribeLineImage
        )}
        style={{ backgroundImage: `url(${ecommerceHeader})` }}
      >
        <div className={classes.container}></div>
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
