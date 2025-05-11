import React from "react";
import { Redirect } from "react-router-dom";
import { ROUTES } from "../utils";

function logout() {
  localStorage.clear();
  return <Redirect to={ROUTES.SIGNIN_ROUTE} />;
}
export default logout;
