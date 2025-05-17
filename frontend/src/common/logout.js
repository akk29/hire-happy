import React from "react";
import { Navigate } from 'react-router-dom'
import { ROUTES } from "../utils";

function logout() {
  localStorage.clear();
  return <Navigate to={ROUTES.SIGNIN_ROUTE} />;
}
export default logout;
