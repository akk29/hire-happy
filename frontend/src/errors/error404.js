import React from "react";
import { Link } from "react-router-dom";
import { FILLER as F, ROUTES } from "../utils";

class Error404 extends React.Component {
  render() {
    var authData = localStorage.getItem(F.AUTH_DATA);
    var link = <a href="/jobs/1"> All Jobs</a>;
    if (authData === null) {
      link = <Link to={ROUTES.SIGNIN_ROUTE}> Signin </Link>;
    }
    return (
      <div>
        <h1> Page Not Found</h1>
        <br />
        {link}
      </div>
    );
  }
}

export default Error404;
