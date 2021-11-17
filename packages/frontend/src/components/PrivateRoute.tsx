import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUsername } from "../utils/util";

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  var isLoggedIn = getUsername() ? true : false;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
