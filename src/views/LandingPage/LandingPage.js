/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Parallax from "components/Parallax/Parallax.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// sections for this page

import SectionCards from "./Sections/LandingSection";

import presentationStyle from "assets/jss/material-kit-pro-react/views/presentationStyle.js";

const useStyles = makeStyles(presentationStyle);

export default function PresentationPage(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Parallax
        image={require("assets/img/test.jpg")}
        className={classes.parallax}
        filter="dark"
        small
      >
        <div style={{ height: "auto" }} className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1>Wherever The Map Takes You</h1>
                <h2 className={classes.title}>We Have You Covered</h2>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionCards
          handleSearchChange={props.handleSearchChange}
          dateOut={props.dateOut}
          dateIn={props.dateIn}
          handleGoogleChange={props.handleGoogleChange}
          city={props.city}
          handleSearchSubmit={props.handleSearchSubmit}
          noOfGuests={props.noOfGuests}
          valid={props.valid}
          waiting={props.waiting}
          handleGuestChange={props.handleGuestChange}
          buttonName={props.buttonName}
        />
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
