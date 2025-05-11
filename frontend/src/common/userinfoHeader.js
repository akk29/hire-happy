import React from "react";
import { FILLER as F } from "../utils";

export default function userinfoHeader() {
  var authData = JSON.parse(localStorage.getItem(F.AUTH_DATA));
  var fullName = `${authData.first_name} ${authData.last_name}`;
  var role = authData.role;
  return (
    <span>
      Hello {fullName} ( {role}) ! &nbsp;
    </span>
  );
}
