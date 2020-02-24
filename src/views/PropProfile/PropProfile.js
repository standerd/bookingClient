/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";
import "../Admin/cssSpinner.css";

const useStyles = makeStyles(profilePageStyle);

export default function ProfilePage(props, { ...rest }) {
  const [accountDetails, setAccountDetails] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    setLoading(true);
    fetch(
      "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/maint/account",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
      .then(res => res.json())
      .then(result => {
        setAccountDetails(result.account);
        setLoading(false);
      })
      .catch(err => console.log(err));
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, [token]);

  let images;

  accountDetails === ""
    ? (images = null)
    : (images = accountDetails[0].images.map((key, index) => {
        return (
          <GridItem key={index} xs={12} sm={12} md={2}>
            <img
              style={{ width: "80%" }}
              src={
                accountDetails === ""
                  ? null
                  : `http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/${key}`
              }
              alt=".."
            />
          </GridItem>
        );
      }));

  const classes = useStyles();

  let form = (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          id="pass"
          labelText="Account Name"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            value: accountDetails === "" ? "Testing" : accountDetails[0].name,
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
      <GridItem xs={12} sm={12} md={4}>
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
            value: accountDetails === "" ? "Testing" : accountDetails[0].email,
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
      <GridItem xs={12} sm={12} md={4}>
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
            value: accountDetails === "" ? "Testing" : accountDetails[0].telNo,
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
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          id="phone2"
          labelText="Alternative Number"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value: accountDetails === "" ? "Testing" : accountDetails[0].altNo,
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
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          id="street"
          labelText="Street Name"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value: accountDetails === "" ? "Testing" : accountDetails[0].street,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>hotel</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          id="sub"
          labelText="Suburb"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value: accountDetails === "" ? "Testing" : accountDetails[0].suburb,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>hotel</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          id="city"
          labelText="City"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value: accountDetails === "" ? "Testing" : accountDetails[0].city,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>hotel</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          id="country"
          labelText="Country"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value:
              accountDetails === "" ? "Testing" : accountDetails[0].country,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>hotel</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          id="post"
          labelText="Postal Code"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value:
              accountDetails === "" ? "Testing" : accountDetails[0].postalCode,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>hotel</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          id="lat"
          labelText="Latitude"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value: accountDetails === "" ? "Testing" : accountDetails[0].lat,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>my_location</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          id="long"
          labelText="Longtitude"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value: accountDetails === "" ? "Testing" : accountDetails[0].long,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>my_location</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          id="rates"
          labelText="Rates"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value:
              accountDetails === ""
                ? "Testing"
                : `R ${accountDetails[0].rates}.00`,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>attach_money</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <CustomInput
          id="descrip"
          labelText="Description"
          formControlProps={{
            fullWidth: true,
            required: true
          }}
          inputProps={{
            type: "text",
            // onChange: props.changeHandler("password"),
            value:
              accountDetails === "" ? "Testing" : accountDetails[0].description,
            required: true,

            startAdornment: (
              <InputAdornment position="start">
                <Icon className={classes.inputIconsColor}>description</Icon>
              </InputAdornment>
            ),
            autoComplete: "off"
          }}
        />
      </GridItem>
      <GridItem md={12}>
        <h3 style={{ textAlign: "center" }}>Your Current Images</h3>
      </GridItem>

      {images}

      <GridItem xs={12} sm={12} md={12}>
        <h3 style={{ textAlign: "center" }}>
          Your Currently Selected Facilities on Offer
        </h3>
      </GridItem>

      <GridItem xs={12} sm={3} md={3}>
        <label htmlFor="at">
          <input
            type="checkBox"
            id="at"
            value={0}
            name="Airport Transfer"
            key="airport"
            // onChange={this.changeCheckHandler}
          />{" "}
          Airport Transfer
        </label>
      </GridItem>

      <GridItem xs={12} sm={3} md={3}>
        <label>
          <input
            type="checkBox"
            value={1}
            name="Swimming Pool"
            key="pool"
            // onChange={this.changeCheckHandler}
          />{" "}
          Swimming Pool
        </label>
      </GridItem>
      <GridItem xs={12} sm={3} md={3}>
        <label>
          <input
            defaultChecked
            type="checkBox"
            value={2}
            name="Concierge Desk"
            key="conceierge"
            // onChange={this.changeCheckHandler}
          />{" "}
          Concierge Desk
        </label>
      </GridItem>
      <GridItem xs={12} sm={3} md={3}>
        <label>
          <input
            type="checkBox"
            value={3}
            name="Wifi"
            key="wifi"
            // onChange={this.changeCheckHandler}
          />{" "}
          Wifi
        </label>
      </GridItem>
      <GridItem xs={12} sm={3} md={3}>
        <label>
          <input
            type="checkBox"
            value={4}
            name="Room Service"
            key="roomSevice"
            // onChange={this.changeCheckHandler}
          />{" "}
          Room Service
        </label>
      </GridItem>
      <GridItem xs={12} sm={3} md={3}>
        <label>
          <input
            defaultChecked
            type="checkBox"
            value={5}
            name="Tea and Coffee Facilities"
            key="teaCoffee"
            // onChange={this.changeCheckHandler}
          />{" "}
          Tee and Coffee Facilities
        </label>
      </GridItem>
      <GridItem xs={12} sm={3} md={3}>
        <label>
          <input
            type="checkBox"
            value={6}
            name="Gymnasium"
            key="gym"
            // onChange={this.changeCheckHandler}
          />{" "}
          Gymnasium
        </label>
      </GridItem>
      <GridItem xs={12} sm={3} md={3}>
        <label>
          <input
            defaultChecked
            type="checkBox"
            value={7}
            name="Bicycle Rental"
            key="bikeRental"
            // onChange={this.changeCheckHandler}
          />{" "}
          Bicyle Rental
        </label>
      </GridItem>
    </GridContainer>
  );

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit PRO React"
        links={<HeaderLinks dropdownHoverColor="info" />}
        changeColorOnScroll={{
          height: 200,
          color: "info"
        }}
        {...rest}
      />

      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: "30px", padding: "2%" }}
      >
        <div className={classes.container}>
          <div className={classNames(classes.description, classes.textCenter)}>
            <h2>Your Account Details</h2>
          </div>
          {loading ? <div className="loader">Loading...</div> : form}
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
