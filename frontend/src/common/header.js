import LogoutButton from "./logoutButton";
import UserinfoHeader from "./userinfoHeader";
import React, { Component } from "react";
export default class header extends Component {
  render() {
    return (
      <div className="header">
        <div>
          <UserinfoHeader />
        </div>
        <br/>
        <div>
          <LogoutButton />
        </div>
      </div>
    );
  }
}
