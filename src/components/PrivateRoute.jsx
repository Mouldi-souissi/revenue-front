import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
