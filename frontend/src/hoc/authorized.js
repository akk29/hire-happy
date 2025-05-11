import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { FILLER as F, ROUTES } from "../utils";

const authorized = (WrappedComponent) => {
  return class authorized extends Component {
    render() {
      var authData = JSON.parse(localStorage.getItem(F.AUTH_DATA));
      if (authData === null) {
        return <Redirect to={ROUTES.SIGNIN_ROUTE} />;
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };
};

export default authorized;
