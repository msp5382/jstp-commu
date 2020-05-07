import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./_style/style.css";
import Auth from "./auth";
import User from "./user";
import Admin from "./admin";

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Redirect path="/" exact to="/auth/login" />
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
