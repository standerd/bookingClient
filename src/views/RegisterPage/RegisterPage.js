/*eslint-disable*/
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
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

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.js";

import image from "assets/img/land3.jpg";

const useStyles = makeStyles(signupPageStyle);

function SignUpPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();

  const submitReg = e => {
    e.preventDefault();

    //before submitting request for registration to the server the password 1 and 2 fields are first
    //checked for a match, if they do not match the user is shown an eror, else registration takes place.
    if (password !== password2) {
      setError(true);
    } else {
      setError(false);

      fetch(
        "http://ec2-54-93-215-192.eu-central-1.compute.amazonaws.com:3001/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            telNo: contact,
            email: email,
            password: password,
            isAdmin: true,
            validated: true
          })
        }
      )
        .then(res => {
          console.log(res);
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
          setError(false);
          setError2(false);
          props.history.push("/loginUser");
        })
        .catch(err => {
          console.log("ERROR" + err);
          setError2(true);
        });
    }
  };
  return (
    <div>
      <Header
        absolute
        color="info"
        brand="Traveller"
        links={<HeaderLinks dropdownHoverColor="info" />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={10} md={10}>
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Register</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <InfoArea
                        className={classes.infoArea}
                        title="Large Selection"
                        description="We have a large selection of properties in all countries."
                        icon={Bed}
                        iconColor="rose"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Free Cancellations"
                        description="Free cancellations available, so change your mind if want to."
                        icon={Cancel}
                        iconColor="primary"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Add Your Own"
                        description="Once registered you can register your own property and make some money."
                        icon={Add}
                        iconColor="info"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={5}>
                      <div className={classes.textCenter}>
                        <Button justIcon round color="google">
                          <i
                            className={
                              classes.socials + " fab fa-google-plus-g"
                            }
                          />
                        </Button>
                        {` `}
                        <h4 className={classes.socialTitle}>
                          or sign up with another email
                        </h4>
                      </div>
                      <form className={classes.form}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            value: name,
                            onChange: e => {
                              setName(e.target.value);
                            },
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Name and Surname"
                          }}
                        />

                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            value: email,
                            onChange: e => {
                              setEmail(e.target.value);
                            },
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Email className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Email..."
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            value: contact,
                            onChange: e => {
                              setContact(e.target.value);
                            },
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Phone className={classes.inputAdornmentIcon}>
                                  lock_outline
                                </Phone>
                              </InputAdornment>
                            ),
                            placeholder: "Contact No"
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            value: password,
                            onChange: e => {
                              setPassword(e.target.value);
                            },
                            type: "password",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Icon className={classes.inputAdornmentIcon}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            placeholder: "Password..."
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            value: password2,
                            onChange: e => {
                              setPassword2(e.target.value);
                            },
                            type: "password",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Icon className={classes.inputAdornmentIcon}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            placeholder: "Confirm Password"
                          }}
                        />

                        <div className={classes.textCenter}>
                          <Button onClick={submitReg} round color="primary">
                            Register
                          </Button>
                        </div>
                      </form>
                      <p
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontWeight: "bold"
                        }}
                      >
                        {error
                          ? "Passwords do not match please try again"
                          : null}
                      </p>
                      <p
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontWeight: "bold"
                        }}
                      >
                        {error2 ? "User Already Exists, please login" : null}
                      </p>
                      <div className={classes.textCenter}>
                        <h6>Already Have An Account</h6>
                        <Link style={{ fontWeight: "bold" }} to="login">
                          Login Here
                        </Link>
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer
          className={classes.footer}
          theme="white"
          content={
            <div>
              <div className={classes.center}>
                &copy; {1900 + new Date().getYear()} , MERN Development{" "}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default withRouter(SignUpPage);
