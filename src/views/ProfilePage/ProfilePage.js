/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// core components

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";
import "./cssSpinner.css";
import image from "assets/img/land3.jpg";

const useStyles = makeStyles(profilePageStyle);

export default function ProfilePage(props, { ...rest }) {
  const [userDetails, setUserDetails] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    setLoading(true);

    fetch(
      "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/search/user",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
      .then(res => res.json())
      .then(result => {
        setUserDetails(result.user);
        setLoading(false);
      })
      .catch(err => console.log(err));
    // window.scrollTo(0, 0);
    // document.body.scrollTop = 0;
  }, [token]);

  const classes = useStyles();

  let form = (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={7}>
        <CustomInput
          id="pass"
          labelText="Account Name"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            value: userDetails === "" ? "Testing" : userDetails[0].name,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>account_box</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={7}>
        <CustomInput
          id="mail"
          labelText="Email Address"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value: userDetails === "" ? "Testing" : userDetails[0].email,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>email</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={7}>
        <CustomInput
          id="phone"
          labelText="Telephone Number"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value: userDetails === "" ? "Testing" : userDetails[0].telNo,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>phone</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={7}>
        <CustomInput
          id="prop"
          labelText="Property Id"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value: userDetails === "" ? "Testing" : userDetails[0].propId,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>local_hotel</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
    </GridContainer>
  );
  return (
    <div>
      <div
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          paddingTop: "10%",
          paddingBottom: "20px",
          height: "93vh"
        }}
      >
        <div
          className={classNames(classes.main, classes.mainRaised)}
          style={{
            marginTop: "30px",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <div
            className={classes.container}
            style={{ paddingTop: "10px", padding: " 10%" }}
          >
            <div
              className={classNames(classes.description, classes.textCenter)}
            >
              <h2>Your Account Details</h2>
            </div>
            {loading ? <div className="loader">Loading...</div> : form}
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
