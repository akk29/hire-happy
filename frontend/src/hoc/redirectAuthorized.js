import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { FILLER as F  } from "../utils";

const redirectAuthorized = (WrappedComponent) => {
  return class redirectAuthorized extends Component {
    render() {
      var authData = JSON.parse(localStorage.getItem(F.AUTH_DATA));
      if (authData !== null) {
        return <Redirect to="/jobs/1" />;
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };
};

export default redirectAuthorized;
