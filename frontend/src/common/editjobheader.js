import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class editjobheader extends Component {
  render() {
    return (
      <span className="JobHeader">
        <Link to="/jobs/1">All jobs</Link> &nbsp; &nbsp;        
        <Link to="/applications/1">All Applications</Link>           
      </span>
    );
  }
}
