/* eslint-disable */
import React, { Fragment } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icon
import Build from "@material-ui/icons/Build";
import People from "@material-ui/icons/People";
import Store from "@material-ui/icons/Store";
import Layers from "@material-ui/icons/Layers";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { dropdownHoverColor } = props;
  const classes = useStyles();

  const user = localStorage.getItem("userId");
  const admin = localStorage.getItem("isAdmin");
  const property = localStorage.getItem("propId");

  let propLinks;
  let adminLinks;
  let userLinks;
  let logout;

  property === "undefined" || property === null
    ? (propLinks = null)
    : (propLinks = (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            navDropdown
            hoverColor={dropdownHoverColor}
            buttonText="Manage Property"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Store}
            dropdownList={[
              <Link to="/maintain" className={classes.dropdownLink}>
                <Layers className={classes.dropdownIcons} />
                Maintain
              </Link>,
              <Link to="/propBookings" className={classes.dropdownLink}>
                <Layers className={classes.dropdownIcons} />
                View Bookings
              </Link>,
              <Link to="/propAccount" className={classes.dropdownLink}>
                <Layers className={classes.dropdownIcons} />
                Property Account
              </Link>
            ]}
          />
        </ListItem>
      ));

  admin === "true"
    ? (adminLinks = (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            navDropdown
            hoverColor={dropdownHoverColor}
            buttonText="Admin"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Build}
            dropdownList={[
              <Link to="/adminBookings" className={classes.dropdownLink}>
                <Layers className={classes.dropdownIcons} />
                View Bookings
              </Link>,
              <Link to="/adminProperties" className={classes.dropdownLink}>
                <Layers className={classes.dropdownIcons} />
                View Properties
              </Link>,
              <Link to="/adminUsers" className={classes.dropdownLink}>
                <Layers className={classes.dropdownIcons} />
                View Users
              </Link>
            ]}
          />
        </ListItem>
      ))
    : (adminLinks = null);

  user === null
    ? (userLinks = (
        <Fragment>
          <Link to="/login" className={classes.dropdownLink}>
            <Layers className={classes.dropdownIcons} />
            Login
          </Link>
          <Link to="/register" className={classes.dropdownLink}>
            <Layers className={classes.dropdownIcons} />
            Register
          </Link>
        </Fragment>
      ))
    : (userLinks = (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            navDropdown
            hoverColor={dropdownHoverColor}
            buttonText="My Account"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={People}
            dropdownList={[
              <Link to="/bookings" className={classes.dropdownLink}>
                <Layers className={classes.dropdownIcons} />
                My Bookings
              </Link>,
              <Link to="/regProperty" className={classes.dropdownLink}>
                <Layers className={classes.dropdownIcons} />
                Register Property
              </Link>,
              <Link to="/myAccount" className={classes.dropdownLink}>
                <Layers className={classes.dropdownIcons} />
                My Account
              </Link>
            ]}
          />
        </ListItem>
      ));

  user !== null
    ? (logout = (
        <Link to="" onClick={props.logout} className={classes.dropdownLink}>
          Logout
        </Link>
      ))
    : (logout = null);

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      {userLinks}
      {propLinks}
      {adminLinks}
      {logout}
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
