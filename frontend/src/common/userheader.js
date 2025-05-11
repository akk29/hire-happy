import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class jobheader extends Component {
  render() {
    return (
      <span className="JobHeader">
        <Link to="/applications/1">All Applications</Link>  &nbsp; &nbsp; &nbsp;
        <Link to="/jobs/1">All Jobs</Link>
      </span>
    );
  }
}
