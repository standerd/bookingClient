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
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import AdminBookings from "views/Admin/AdminBookings";
import AdminProperties from "views/Admin/AdminProperties";
import AdminUsers from "views/Admin/AdminUser";

class App extends Component {
  state = {
    email: "",
    password: "",
    entityMail: "",
    entityPassword: "",
    isAuth: false,
    token: null,
    userId: null,
    propId: undefined,
    isAdmin: false,
    showBackdrop: false,
    showMobileNav: false,
    error: false,
    errMessage: "",
    valid: true,
    city: "",
    dateIn: "",
    dateOut: "",
    noOfGuests: "1",
    lat: "",
    lng: "",
    zoomLevel: 3,
    searchArray: null,
    searching: false,
    initialLat: -29.27076,
    initialLng: 25.112268,
    zoom: 5,
    selected: false,
    amendSearch: false,
    waiting: false,
    markerIndex: "",
    showInfo: false
  };

  //login change handler that handles the users email and password input data.
  loginChangeHandler = name => e => {
    console.log(e.target.value);
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
          throw new Error("Please validate your e-mail adress first.");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Invalid Login Credentials");
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
          propId: resData.propId,
          isAdmin: resData.isAdmin,
          error: false,
          valid: true
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("propId", resData.propId);
        localStorage.setItem("isAdmin", resData.isAdmin);

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
          error: true,
          errMessage: err.message
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
        console.log(err);
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
    localStorage.removeItem("propId");
    localStorage.removeItem("isAdmin");

    this.props.history.push("/");
  };

  componentDidMount() {
    // authentication status is checked on component mount and if the users token had not yet expired
    // the is login status is set to having been logged in.
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("tokenExpiry");
    const propId = localStorage.getItem("propId");
    const isAdmin = localStorage.getItem("isAdmin");
    const userId = localStorage.getItem("userId");

    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }

    const remainingTime = new Date(expiryDate).getTime() - new Date().getTime();

    this.setState({
      isAuth: true,
      token: token,
      userId: userId,
      propId: propId === "undefined" ? undefined : propId,
      isAdmin: isAdmin === "true" ? true : false
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

  // Property Search Functionality
  handleGoogleChange = address => {
    const [city, latLong] = address;
    this.setState({
      city: city,
      initialLat: parseFloat(latLong[0]),
      initialLng: parseFloat(latLong[1]),
      selected: true,
      zoom: 10
    });
  };

  handleGuestChange = e => {
    this.setState({ noOfGuests: e.target.value, amendSearch: true });
  };

  handleSearchChange = (name, value) => {
    if (name === "dateIn") {
      this.setState({ dateIn: value.toLocaleDateString(), dateOut: "" });
    } else {
      this.setState({ dateOut: value.toLocaleDateString() });
    }
  };

  //search component on click handler, once the search details is submitted, the data is
  //sent to the server as a POST request and the returned data is set to state.
  handleSearchSubmit = e => {
    e.preventDefault();
    this.setState({ waiting: true });
    this.state.city === ""
      ? this.setState({ valid: false })
      : fetch("/search/searchProperty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            lat: this.state.initialLat,
            lng: this.state.initialLng
          })
        })
          .then(res => res.json())
          .then(result => {
            console.log(result);
            // if no properties were found for the search location entered by the user
            // the server returns null, if null is received an error is set and a message
            // is shown to the user which cities have got properties loaded.
            if (result.results === null) {
              this.setState({ getError: true, searching: true });
            } else {
              this.setState(
                {
                  searching: true,
                  searchArray: result.results,
                  amendSearch: false,
                  valid: true,
                  getError: false,
                  waiting: false
                },
                () => this.props.history.push("/searchResults")
              );
            }
          })
          .catch(err => console.log("There was an errro" + err));
  };

  // map marker info boxes on marker click.
  openWindow = index => {
    this.setState({ showInfo: true, markerIndex: index });
  };

  closeWindow = () => {
    this.setState({ showInfo: false });
  };

  render() {
    return (
      <div>
        <Header
          brand="Traveller"
          links={
            <HeaderLinks
              logout={this.logoutHandler}
              dropdownHoverColor="info"
            />
          }
          fixed
          color="white"
          changeColorOnScroll={{
            height: 400,
            color: "info"
          }}
        />
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
                errMessage={this.state.errMessage}
              />
            )}
          />
          <Route path="/register" component={RegisterPage} />
          <Route
            path="/searchResults"
            render={() => (
              <SearchResults
                {...this.props}
                markerArray={this.state.searchArray}
                initialLat={this.state.initialLat}
                initialLng={this.state.initialLng}
                zoom={this.state.zoom}
                selected={this.state.selected}
                dateIn={this.state.dateIn}
                dateOut={this.state.dateOut}
                amendSearch={this.state.amendSearch}
                auth={this.props.isAuth}
                openWindow={this.openWindow}
                closeWindow={this.closeWindow}
                showInfo={this.state.showInfo}
                propsName={
                  this.state.markerIndex === ""
                    ? "No Info"
                    : this.state.searchArray[this.state.markerIndex].name
                }
                propsLat={
                  this.state.markerIndex === ""
                    ? "No Info"
                    : this.state.searchArray[this.state.markerIndex].lat
                }
                propsLng={
                  this.state.markerIndex === ""
                    ? "No Info"
                    : this.state.searchArray[this.state.markerIndex].long
                }
              />
            )}
          />
          <Route path="/propDetails" component={PropDetailsPage} />
          <Route path="/completeBooking" component={CompleteBookingPage} />
          <Route path="/bookings" component={UserBookings} />
          <Route path="/manageBooking" component={ManageBookings} />
          <Route path="/propContact" component={PropContactPage} />
          <Route path="/adminBookings" component={AdminBookings} />
          <Route path="/adminUsers" component={AdminUsers} />
          <Route path="/adminProperties" component={AdminProperties} />
          <Route
            path="/"
            exact
            render={() => (
              <LandingPage
                {...this.props}
                handleSearchChange={this.handleSearchChange}
                handleGuestChange={this.handleGuestChange}
                dateOut={this.state.dateOut}
                dateIn={this.state.dateIn}
                handleGoogleChange={this.handleGoogleChange}
                city={this.state.city}
                handleSearchSubmit={this.handleSearchSubmit}
                noOfGuests={this.state.noOfGuests}
                valid={this.state.valid}
                waiting={this.state.waiting}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
