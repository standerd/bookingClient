/*eslint-disable*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Phone from "@material-ui/icons/PhoneIphone";
import Icon from "@material-ui/core/Icon";
import Add from "@material-ui/icons/AddCircleOutline";
import Bed from "@material-ui/icons/Hotel";
import Cancel from "@material-ui/icons/Cancel";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import People from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.js";

import image from "assets/img/land3.jpg";

export default class SignUpPage extends Component {
  state = {
    name: "",
    type: "",
    street: "",
    city: "",
    country: "",
    suburb: "",
    postal: "",
    telNo: "",
    altNo: "",
    email: "",
    adminName: "",
    password: "",
    rates: "",
    description: "",
    password2: "",
    error: false,
    error2: false,
    option: [],
    loading: false,
    //looks strange, used to manage the state of the checkboxes.
    index: [false, false, false, false, false, false, false, false]
  };

  // the change handler sets the state values of the input fields.
  changeHandler = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // The submithandler submits all the data that the entity entered for registration purposes.
  // the Enity will now be required to login and will then be able to add images for the profile.
  onSubmitHandler = e => {
    let userId = localStorage.getItem("userId");
    e.preventDefault();
    this.setState({ loading: true });

    this.setState({ error: false }, () => {
      fetch("/entity/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          entityType: this.state.entityType,
          street: this.state.street,
          suburb: this.state.suburb,
          city: this.state.city,
          country: this.state.country,
          postalCode: this.state.postal,
          telNo: this.state.telNo,
          altNo: this.state.altNo,
          email: this.state.email,
          userName: this.state.userName,
          facilities: this.state.option,
          rates: this.state.rates,
          description: this.state.description,
          userId: userId
        })
      })
        .then(res => {
          if (res.status === 401) {
            throw new Error(
              "Validation failed. Make sure the email address isn't used yet!"
            );
          }

          if (res.status !== 200 && res.status !== 201) {
            console.log("Error!");
            throw new Error("Creating a user failed!");
          }

          return res.json();
        })
        .then(result => {
          this.setState({ error: false, error2: false, loading: false });
          this.props.history.push("/maintain");
        })
        .catch(err => this.setState({ error2: true, loading: false }));
    });
  };

  // clicking on a checkbox adds the value, "service offered" to an array
  // the array is then stored as an array in MongoDB.
  changeCheckHandler = e => {
    // as state array values are not to be mutated, a new Array is created from
    // the current array value stored inside state. This new array is then appended
    // with the new value and then the new array is set as the new state value.
    let currentValue = e.target.name;
    let currentIndex = e.target.value;
    let oldValueArray = [...this.state.option];
    let indexArray = [...this.state.index];
    let indexOf = this.state.option.indexOf(currentValue);

    // check if the input box is active or not, if it is, the value is removed from state
    // else the value is appended to state.
    if (indexArray[currentIndex]) {
      indexArray[currentIndex] = false;
      oldValueArray.splice(indexOf, 1);
      return this.setState({ index: indexArray, option: oldValueArray });
    } else {
      indexArray[currentIndex] = true;
      oldValueArray.push(currentValue);
      return this.setState({ index: indexArray, option: oldValueArray });
    }
  };

  render() {
    return (
      <div>
        <div
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            paddingTop: "200px"
          }}
        >
          <div>
            <Card>
              <h2 style={{ textAlign: "center" }}>Register</h2>
              <form onSubmit={this.onSubmitHandler}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={1} md={2}></GridItem>
                    <GridItem xs={12} sm={5} md={3}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.name,
                          onChange: this.changeHandler("name"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face />
                            </InputAdornment>
                          ),
                          placeholder: "Property Name"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={3}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.street,
                          onChange: this.changeHandler("street"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face />
                            </InputAdornment>
                          ),
                          placeholder: "Street Name and Number"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={3}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.suburb,
                          onChange: this.changeHandler("suburb"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face />
                            </InputAdornment>
                          ),
                          placeholder: "Suburb"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={1} md={2}></GridItem>
                    <GridItem xs={12} sm={5} md={3}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.city,
                          onChange: this.changeHandler("city"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face />
                            </InputAdornment>
                          ),
                          placeholder: "City"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={3}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.country,
                          onChange: this.changeHandler("country"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face />
                            </InputAdornment>
                          ),
                          placeholder: "Country"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={3}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.postal,
                          onChange: this.changeHandler("postal"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face />
                            </InputAdornment>
                          ),
                          placeholder: "Postal Code"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={1} md={2}></GridItem>
                    <GridItem xs={12} sm={5} md={3}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.telNo,
                          onChange: this.changeHandler("telNo"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face />
                            </InputAdornment>
                          ),
                          placeholder: "Telephone Number"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={3}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.altNo,
                          onChange: this.changeHandler("altNo"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face />
                            </InputAdornment>
                          ),
                          placeholder: "Alternative Number"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={3}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.email,
                          onChange: this.changeHandler("email"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face />
                            </InputAdornment>
                          ),
                          placeholder: "Email Address"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={1} md={2}></GridItem>
                    <GridItem xs={12} sm={5} md={3}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.rates,
                          onChange: this.changeHandler("rates"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face />
                            </InputAdornment>
                          ),
                          placeholder: "Room Rate"
                        }}
                      />
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={5}
                      md={3}
                      style={{ marginTop: "10px" }}
                    >
                      <FormControl fullWidth>
                        <InputLabel htmlFor="simple-select">
                          Property Type
                        </InputLabel>
                        <Select
                          value={this.state.type}
                          onChange={this.changeHandler("type")}
                          inputProps={{
                            name: "propertyType",
                            id: "prop-type"
                          }}
                        >
                          <MenuItem disabled>Property Type</MenuItem>
                          <MenuItem value="Hotel">Hotel</MenuItem>
                          <MenuItem value="Guest House">Guest House</MenuItem>
                          <MenuItem value="Apartment">Apartment</MenuItem>
                          <MenuItem value="Hostel">Hostel</MenuItem>
                          <MenuItem value="Camp Site">Camp Site</MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <h4 style={{ textAlign: "center" }}>
                        Please Select Your Property Facilities From the Below
                        Options
                      </h4>
                    </GridItem>
                    <GridItem xs={12} sm={2} md={2}></GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <label htmlFor="at">
                        <input
                          type="checkBox"
                          id="at"
                          value={0}
                          name="Airport Transfer"
                          key="airport"
                          onChange={this.changeCheckHandler}
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
                          onChange={this.changeCheckHandler}
                        />{" "}
                        Swimming Pool
                      </label>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <label>
                        <input
                          type="checkBox"
                          value={2}
                          name="Concierge Desk"
                          key="conceierge"
                          onChange={this.changeCheckHandler}
                        />{" "}
                        Concierge Desk
                      </label>
                    </GridItem>
                    <GridItem xs={12} sm={2} md={2}></GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <label>
                        <input
                          type="checkBox"
                          value={3}
                          name="Wifi"
                          key="wifi"
                          onChange={this.changeCheckHandler}
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
                          onChange={this.changeCheckHandler}
                        />{" "}
                        Room Service
                      </label>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <label>
                        <input
                          type="checkBox"
                          value={5}
                          name="Tea and Coffee Facilities"
                          key="teaCoffee"
                          onChange={this.changeCheckHandler}
                        />{" "}
                        Tee and Coffee Facilities
                      </label>
                    </GridItem>
                    <GridItem xs={12} sm={2} md={2}></GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <label>
                        <input
                          type="checkBox"
                          value={6}
                          name="Gymnasium"
                          key="gym"
                          onChange={this.changeCheckHandler}
                        />{" "}
                        Gymnasium
                      </label>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <label>
                        <input
                          type="checkBox"
                          value={7}
                          name="Bicycle Rental"
                          key="bikeRental"
                          onChange={this.changeCheckHandler}
                        />{" "}
                        Bicyle Rental
                      </label>
                    </GridItem>
                  </GridContainer>
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={3} md={3}></GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <textarea
                        placeholder="Property Description"
                        value={this.state.description}
                        onChange={this.changeHandler("description")}
                        required
                        rows="5"
                        cols="140"
                        style={{ borderRadius: "5px", padding: "10px" }}
                      ></textarea>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}></GridItem>
                  </GridContainer>
                  <br />
                  <GridContainer>
                    <GridItem xs={2} sm={4} md={4}></GridItem>
                    <GridItem
                      xs={8}
                      sm={4}
                      md={4}
                      style={{ textAlign: "center" }}
                    >
                      <Button type="submit">Submit Form</Button>
                    </GridItem>
                    <GridItem xs={2} sm={4} md={4}></GridItem>
                  </GridContainer>
                </CardBody>
              </form>
            </Card>
          </div>
          <Footer
            theme="white"
            content={
              <div>
                <div>
                  &copy; {1900 + new Date().getYear()} , MERN Development{" "}
                </div>
              </div>
            }
          />
        </div>
      </div>
    );
  }
}
