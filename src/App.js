import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";

// pages for this product
import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
import BlogPostPage from "views/BlogPostPage/BlogPostPage.js";
import BlogPostsPage from "views/BlogPostsPage/BlogPostsPage.js";
import ComponentsPage from "views/ComponentsPage/ComponentsPage.js";
import PropContactPage from "views/PropContactPage/PropContactPage.js";
import SearchResults from "views/SearchResults/SearchResultsPage";
import LoginPage from "views/LoginPage/LoginPage.js";
import LandingPage from "views/LandingPage/LandingPage";
import ManageBookings from "views/ManageBooking/ManageBookingPage";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import PropDetailsPage from "views/PropDetailsPage/PropDetailsPage";
import SectionsPage from "views/SectionsPage/SectionsPage.js";
import CompleteBookingPage from "views/CompleteBookingPage/CompleteBookingPage";
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import ErrorPage from "views/ErrorPage/ErrorPage.js";
import UserBookings from "views/UserBookings/UserBookingsPage";

class App extends Component {
  state = {
    email: "",
    password: "",
    entityMail: "",
    entityPassword: "",
    isAuth: false,
    token: null,
    userId: null,
    showBackdrop: false,
    showMobileNav: false,
    error: false,
    type: "user"
  };

  //login change handler that handles the users email and password input data.
  loginChangeHandler = name => e => {
    this.setState({ [name]: e.target.value });
  };

  //user login handler
  loginHandler = e => {
    e.preventDefault();

    fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        //sets user login status and jwt data in local storage, this allows for the users details to be sent
        //inside the auth headers to access routes that are protected.
        this.setState({
          isAuth: true,
          token: resData.token,
          userId: resData.userId,
          type: resData.type,
          error: false
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("type", resData.type);

        //sets token expiry, users are automatically logged out after 60 mins.
        const remainingTime = 60 * 60 * 1000;
        const tokenExpiry = new Date(new Date().getTime() + remainingTime);
        localStorage.setItem("tokenExpiry", tokenExpiry.toISOString());
        this.props.history.replace("/");
      })
      .catch(err => {
        this.setState({
          isAuth: false,
          authLoading: false,
          error: true
        });
      });
  };

  //google login handler, after the request is sent to the server containing the user info received
  //from the google API, the login process is exactly the same as for local login.
  googleLoginHandler = response => {
    // token is returned by the google API, token is validated in the server side code also.
    let token = response.Zi.id_token;
    fetch("/user/googlelogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        //sets user login status and jwt data in local storage, this allows for the users details to be sent
        //inside the auth headers to access routes that are protected.
        this.setState({
          isAuth: true,
          token: resData.token,
          userId: resData.userId,
          type: resData.type,
          error: false
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("type", resData.type);

        //autologout info.
        const remainingTime = 60 * 60 * 1000;
        const tokenExpiry = new Date(new Date().getTime() + remainingTime);
        localStorage.setItem("tokenExpiry", tokenExpiry.toISOString());
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          isAuth: false,
          authLoading: false,
          error: true
        });
      });
  };

  //facebook login handler.
  facebookLoginHandler = response => {
    //response is received from facebook API when user logs in. This data is sent to the server
    //for login or registration of the user. the token is also validated in the server against
    //the facebook validation API.
    const token = response.accessToken;

    //unlike google login, facebook validation results in the server does not return user details again
    //so these are sent to the server with the login request.
    const { name, email, userID } = response;

    fetch("/user/facebookLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token,
        name,
        email,
        userID
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        //sets user login status and jwt data in local storage, this allows for the users details to be sent
        //inside the auth headers to access routes that are protected.
        this.setState({
          isAuth: true,
          token: resData.token,
          userId: resData.userId,
          type: resData.type,
          error: false
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("type", resData.type);

        //autologout info
        const remainingTime = 60 * 60 * 1000;
        const tokenExpiry = new Date(new Date().getTime() + remainingTime);
        localStorage.setItem("tokenExpiry", tokenExpiry.toISOString());
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          isAuth: false,
          authLoading: false,
          error: true
        });
      });
  };

  // user logout handler, remove the jwt data from local storage and logs the user out.
  logoutHandler = () => {
    this.setState({ isAuth: false, token: null, userId: null, type: "user" });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("type");

    this.props.history.push("/");
  };

  componentDidMount() {
    // authentication status is checked on component mount and if the users token had not yet expired
    // the is login status is set to having been logged in.
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("tokenExpiry");
    const type = localStorage.getItem("type");

    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }

    const userId = localStorage.getItem("userId");
    const remainingTime = new Date(expiryDate).getTime() - new Date().getTime();

    this.setState({
      isAuth: true,
      token: token,
      userId: userId,
      type: type
    });

    this.setAutoLogout(remainingTime);
  }

  // if the token received from the backend expires the user is logged out, the normal logout
  // handeler function is then called.
  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  render() {
    return (
      <Switch>
        <Route path="/about-us" component={AboutUsPage} />
        <Route path="/blog-post" component={BlogPostPage} />
        <Route path="/blog-posts" component={BlogPostsPage} />
        <Route path="/components" component={ComponentsPage} />
        <Route path="/sections" component={SectionsPage} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/error-page" component={ErrorPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route
          path="/login"
          render={() => (
            <LoginPage
              {...this.props}
              loginHandler={this.loginHandler}
              changeHandler={this.loginChangeHandler}
              googleLogin={this.googleLoginHandler}
              facebookLogin={this.facebookLoginHandler}
              email={this.state.email}
              password={this.state.password}
              error={this.state.error}
            />
          )}
        />
        <Route path="/register" component={RegisterPage} />
        <Route path="/searchResults" component={SearchResults} />
        <Route path="/propDetails" component={PropDetailsPage} />
        <Route path="/completeBooking" component={CompleteBookingPage} />
        <Route path="/bookings" component={UserBookings} />
        <Route path="/manageBooking" component={ManageBookings} />
        <Route path="/propContact" component={PropContactPage} />
        <Route path="/" exact component={LandingPage} />
      </Switch>
    );
  }
}

export default withRouter(App);
