/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Footer from "components/Footer/Footer.js";
// sections for this page
import SectionBookings from "./Sections/SectionBookings";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceStyle.js";
import image from "assets/img/land3.jpg";

const useStyles = makeStyles(styles);

export default function EcommercePage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <div
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          paddingTop: "9%",
          paddingBottom: "2%"
        }}
      >
        <div
          className={classNames(classes.main, classes.mainRaised)}
          style={{ marginTop: "2px" }}
        >
          <SectionBookings />
        </div>
      </div>
      <Footer
        theme="white"
        content={
          <div>
            <div>&copy; {1900 + new Date().getYear()} , MERN Development </div>
          </div>
        }
      />
    </div>
  );
}
