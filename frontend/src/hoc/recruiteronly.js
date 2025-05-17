import React, { Component } from "react";
import { Navigate } from 'react-router-dom'
import { FILLER as F } from "../utils";

const recruiteronly = (WrappedComponent) => {
  return class recruiteronly extends Component {
    render() {
      var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role;
      if (role === F.RECRUITER_ROLE) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <Navigate to="/jobs/1" />;
      }
    }
  };
};

export default recruiteronly;
