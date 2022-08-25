import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from 'utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/landing", state: { from: props.location } }}
          />
        )
      }
    />
  )
};

export default PrivateRoute;
