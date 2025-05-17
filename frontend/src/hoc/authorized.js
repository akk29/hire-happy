import React, { Component } from "react";
import { Navigate } from 'react-router-dom'
import { FILLER as F, ROUTES } from "../utils";

const authorized = (WrappedComponent) => {
  return class authorized extends Component {
    render() {
      var authData = JSON.parse(localStorage.getItem(F.AUTH_DATA));
      if (authData === null) {
        return <Navigate to={ROUTES.SIGNIN_ROUTE} />;
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };
};

export default authorized;
