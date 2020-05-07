import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import AllUser from "./AllUser";

export default () => {
  let { path, url } = useRouteMatch();

  return (
    <Router>
      <Switch>
        <Route path={`${path}/all_users`}>
          <AllUser> </AllUser>
        </Route>
      </Switch>
    </Router>
  );
};
