import React from "react";
import { Navigate } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { logoutAction } from "../actions/authActions";
import { connect } from "react-redux";
import { ROUTES } from "../utils";

class LogoutButton extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  handleClick = (e) => {
    localStorage.clear();
    this.props.logoutAction();
    this.setState(() => {
      return {
        redirect: true,
      };
    });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={ROUTES.SIGNIN_ROUTE}/>;
    } else {
      return (
        <button className="btn btn-primary" onClick={this.handleClick}>
          Logout
        </button>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  logout: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logoutAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
