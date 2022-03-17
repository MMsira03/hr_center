import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import App from './App';

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App/> 
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/admin/report" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
