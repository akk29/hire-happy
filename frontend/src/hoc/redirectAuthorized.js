import React, { Component } from "react";
import { Navigate } from 'react-router-dom'
import { FILLER as F  } from "../utils";

const redirectAuthorized = (WrappedComponent) => {
  return class redirectAuthorized extends Component {
    render() {
      var authData = JSON.parse(localStorage.getItem(F.AUTH_DATA));
      if (authData !== null) {
        return <Navigate to="/jobs/1" />;
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };
};

export default redirectAuthorized;
