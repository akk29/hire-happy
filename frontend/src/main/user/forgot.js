import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ForgotAction } from "../../actions/authActions";
import Errorslist from "../../common/errorslist";
import { ROUTES } from "../../utils";

class forgot extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.ForgotAction(this.state);
  };

  handleOnChange = (event) => {
    var { name, value } = event.target;
    const noop = () => {}
    name === "profiletype" ? (value = parseInt(value)) : noop();
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        {typeof this.props.errors === "undefined" ? (
          <div> </div>
        ) : (
          <Errorslist {...this.props.errors} />
        )}
        <h1>Forgot Password</h1>
        <br />
        <form
          className="form-horizontal"
          onSubmit={this.handleOnSubmit}
          method="post"
        >
          <div className="form-group">
            <label>Email : </label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleOnChange}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" disabled={this.props.disabled}>
              Send Link
            </button>  &nbsp;
            <Link to={ROUTES.SIGNIN_ROUTE}> Login </Link> &nbsp; &nbsp;
            <Link to={ROUTES.SIGNUP_ROUTE}> Register </Link>  
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ForgotAction }, dispatch);
};

const mapStateToProps = (state) => ({
  userInfo: state.auth.userinfo,
  errors: state.auth.errors,
  disabled: state.auth.disable,
});

export default connect(mapStateToProps, mapDispatchToProps)(forgot);