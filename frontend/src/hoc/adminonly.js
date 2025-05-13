import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { FILLER as F } from "../utils";

const adminonly = (WrappedComponent) => {
  return class adminonly extends Component {
    render() {
      var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role;
      if (role !== F.SUPER_USER_ROLE) {
        return <Redirect to="/jobs/1" />;
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };
};

export default adminonly;
