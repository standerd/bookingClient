/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PinDrop from "@material-ui/icons/PinDrop";
import Phone from "@material-ui/icons/Phone";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";

//Key import

import KEY from "../../config/keys";

import contactUsStyle from "assets/jss/material-kit-pro-react/views/contactUsStyle.js";

const useStyles = makeStyles(contactUsStyle);

export default function ContactUsPage(props) {
  const [propertyDetails, setPropertyDetails] = React.useState("");
  const [message, setMessage] = React.useState("");

  let property = props.location.query.propId;
  let booking = props.location.query.bookId;
  const userId = localStorage.getItem("userId");

  console.log(property);
  console.log(message);
  React.useEffect(() => {
    fetch(`http://localhost:3001/search/getProperty/${property}`)
      .then(res => res.json())
      .then(result => {
        setPropertyDetails(result.details);
      })
      .catch(err => console.log(err));
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  const classes = useStyles();

  const CustomSkinMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{
          lat: parseInt(propertyDetails.lat),
          lng: parseInt(propertyDetails.long)
        }}
        defaultOptions={{
          scrollwheel: false,
          zoomControl: true,
          styles: [
            {
              featureType: "water",
              stylers: [
                { saturation: 43 },
                { lightness: -11 },
                { hue: "#0088ff" }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [
                { hue: "#ff0000" },
                { saturation: -100 },
                { lightness: 99 }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#808080" }, { lightness: 54 }]
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry.fill",
              stylers: [{ color: "#ece2d9" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [{ color: "#ccdca1" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#767676" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#ffffff" }]
            },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            {
              featureType: "landscape.natural",
              elementType: "geometry.fill",
              stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
            },
            { featureType: "poi.park", stylers: [{ visibility: "on" }] },
            {
              featureType: "poi.sports_complex",
              stylers: [{ visibility: "on" }]
            },
            { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
            {
              featureType: "poi.business",
              stylers: [{ visibility: "simplified" }]
            }
          ]
        }}
      >
        <Marker
          position={{
            lat: parseInt(propertyDetails.lat),
            lng: parseInt(propertyDetails.long)
          }}
        />
      </GoogleMap>
    ))
  );

  const messageSet = e => {
    setMessage(e.target.value);
  };

  const sendMessage = e => {
    e.preventDefault();
    fetch("http://localhost:3001/search/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message,
        userID: userId,
        bookID: booking
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Header
        brand="Traveller"
        links={<HeaderLinks dropdownHoverColor="dark" />}
        fixed
        color="dark"
      />
      <div className={classes.bigMap}>
        <CustomSkinMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${KEY.mapsKey}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div
              style={{
                height: `100%`,
                borderRadius: "6px",
                overflow: "hidden"
              }}
            />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.contactContent}>
          <div className={classes.container}>
            <h2 className={classes.title}>Contact Property</h2>
            <GridContainer>
              <GridItem md={6} sm={6}>
                <p>
                  This will send a message directly to the property. They will
                  respond to your request directly via E-Mail.
                  <br />
                  <br />
                </p>
                <form>
                  <CustomInput
                    labelText="Your message"
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 6,
                      value: message,
                      onChange: messageSet
                    }}
                  />
                  <div className={classes.textCenter}>
                    <Button color="primary" round onClick={sendMessage}>
                      Send
                    </Button>
                  </div>
                </form>
              </GridItem>
              <GridItem md={4} sm={4} className={classes.mlAuto}>
                <InfoArea
                  className={classes.info}
                  title="Property Location"
                  description={
                    <p>
                      {propertyDetails.street}, <br /> {propertyDetails.suburb},{" "}
                      <br /> {propertyDetails.city}, <br />{" "}
                      {propertyDetails.country}
                    </p>
                  }
                  icon={PinDrop}
                  iconColor="primary"
                />
                <InfoArea
                  className={classes.info}
                  title="Property Contact Details"
                  description={
                    <p>
                      {propertyDetails.telNo} <br /> {propertyDetails.altNo}{" "}
                      <br /> Mon - Sun, 8:00-22:00
                    </p>
                  }
                  icon={Phone}
                  iconColor="primary"
                />
                <InfoArea
                  className={classes.info}
                  title="Legal Information"
                  description={
                    <p>
                      {propertyDetails.name}, <br /> Banking Details: Please
                      Request
                    </p>
                  }
                  icon={BusinessCenter}
                  iconColor="primary"
                />
              </GridItem>
            </GridContainer>
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
