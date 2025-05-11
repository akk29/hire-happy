import React, { Component } from "react";

class errorslist extends Component {
  render() {
    if (this.props) {
      return (
        <div>
          <br />
          <ul className="error-messages">
            {Object.keys(this.props.errors).map((key) => {
              return (
                <li key={key}>
                  {key} : {this.props.errors[key]}
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default errorslist;
