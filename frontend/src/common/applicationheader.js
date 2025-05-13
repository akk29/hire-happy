import React, { Component } from "react";
import {Link} from "react-router-dom";
import { FILLER as F, ROUTES } from "../utils";

export default class applicationheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: this.props.role,
    };
  }
  render() {
    if (this.state.role === F.RECRUITER_ROLE) {
      return (
        <span className="JobHeader">
          <Link to={ROUTES.POST_JOB_ROUTE}>Post Job </Link> &nbsp; &nbsp; &nbsp;                    
          <Link to="/jobs/1">All Jobs</Link>
        </span>
      );
    } else if (this.state.role === F.SUPER_USER_ROLE) {
      return (
        <span className="JobHeader">          
          <Link to="/jobs/1">All Jobs</Link> &nbsp; &nbsp; &nbsp;          
          <Link to="/users/1">All Users</Link>
        </span>
      );
    } else {
      return (
        <span className="JobHeader">
          <Link to="/jobs/1">All Jobs</Link>
        </span>
      );
    }
  }
}
