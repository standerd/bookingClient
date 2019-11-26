/*!

=========================================================
* Material Kit PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LoadScript } from "@react-google-maps/api";
import KEY from "./config/keys";

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";

ReactDOM.render(
  <BrowserRouter>
    <LoadScript
      id="script-loader"
      libraries={["places"]}
      googleMapsApiKey={KEY.mapsKey}
    >
      <App />
    </LoadScript>
  </BrowserRouter>,

  document.getElementById("root")
);
