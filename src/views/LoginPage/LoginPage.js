/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
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
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";

//Third Party Oath Login import
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import image from "assets/img/landing.jpg";

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage(props) {
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
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    color="info"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Login With</h4>
                    <GoogleLogin />
                  </CardHeader>
                  <p className={classes.description + " " + classes.textCenter}>
                    Or Use Your Account
                  </p>
                  <CardBody signup>
                    <CustomInput
                      id="email"
                      value={props.email}
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        placeholder: "Email...",
                        type: "email",
                        onChange: props.changeHandler("email"),
                        value: props.email,
                        required: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        placeholder: "Password",
                        type: "password",
                        onChange: props.changeHandler("password"),
                        value: props.password,
                        required: true,
                        error: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button
                      type="submit"
                      onClick={props.loginHandler}
                      color="info"
                    >
                      Login
                    </Button>

                    <h6>Don't Have An Account</h6>
                    <Link
                      to="register"
                      style={{ color: "#00acc1", fontWeight: "bold" }}
                    >
                      Register Here
                    </Link>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
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
    </div>
  );
}
