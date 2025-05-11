import React, { Component } from "react";

const LoaderHOC = (WrappedComponent) => {
  return class LoaderHOC extends Component {
    render() {
      return this.props.isloading ? (
        <h1>Please wait </h1>
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };
};

export default LoaderHOC;
