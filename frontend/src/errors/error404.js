import React from "react";
import { FILLER as F, ROUTES } from "../utils";

class Error404 extends React.Component {
  render() {
    var authData = localStorage.getItem(F.AUTH_DATA);
    var link = <a href="/jobs/1"> All Jobs</a>;
    if (authData === null) {
      link = <a href={ROUTES.SIGNIN_ROUTE}> Signin </a>;
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
