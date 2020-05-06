import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import Login from "./Login";
import AdminLogin from "./AdminLogin";

export default () => {
  let { path, url } = useRouteMatch();

  return (
    <Router>
      <Switch>
        <Route path={`${path}/login`}>
          <Login> </Login>
        </Route>
        <Route path={`${path}/adminLogin`}>
          <AdminLogin> </AdminLogin>
        </Route>
      </Switch>
    </Router>
  );
};
