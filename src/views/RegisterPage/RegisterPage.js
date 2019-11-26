/*eslint-disable*/
import React from "react";
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

export default function SignUpPage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
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
                        <Button justIcon round color="facebook">
                          <i
                            className={classes.socials + " fab fa-facebook-f"}
                          />
                        </Button>
                        {` `}
                        <h4 className={classes.socialTitle}>or be classical</h4>
                      </div>
                      <form className={classes.form}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
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
                          <Button round color="primary">
                            Get Going
                          </Button>
                        </div>
                      </form>
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
