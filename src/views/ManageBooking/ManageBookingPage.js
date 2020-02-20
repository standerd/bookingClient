/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
// sections for this page
import SectionPricing from "./Sections/ManageBookingSection";

import pricingStyle from "assets/jss/material-kit-pro-react/views/pricingStyle.js";

const useStyles = makeStyles(pricingStyle);

export default function PricingPage(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();

  console.log(props.location.query);
  return (
    <div>
      <Header
        brand="Traveller"
        links={<HeaderLinks dropdownHoverColor="info" />}
        color="transparent"
        changeColorOnScroll={{
          height: 200,
          color: "rose"
        }}
      />

      <Parallax image={require("assets/img/change.jpg")} filter="dark" small>
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
              <h1 className={classes.title}>Changed Your Mind ?</h1>
              <h4>No problem, please review your booking below.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <SectionPricing />
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
