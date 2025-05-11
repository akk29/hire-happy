import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { FILLER as F, RECRUITER_ROLE } from "../utils";

const recruiteronly = (WrappedComponent) => {
  return class recruiteronly extends Component {
    render() {
      var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role;
      if (role === RECRUITER_ROLE) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <Redirect to="/jobs/1" />;
      }
    }
  };
};

export default recruiteronly;
