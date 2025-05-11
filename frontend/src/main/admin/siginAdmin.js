import React from "react";
import { connect } from "react-redux";
import { SigninAction, startStopLoader } from "../../actions/authActions";
import { bindActionCreators } from "redux";
import Errorslist from "../../common/errorslist";
import RedirectAuthorized from "../../hoc/redirectAuthorized";
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaRef = React.createRef();

class SigninAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      disable: true,
    };
    this.handleCaptcha = this.handleCaptcha.bind(this);
  }

  componentDidMount() {
    document.title = "Admin Signin";
    this.props.startStopLoader();
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    var payload = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.SigninAction(payload, "Admin");
  };

  handleCaptcha() {
    this.setState({
      disable: false,
    });
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    if (!this.props.isloading) {
      return (
        <div>
          {typeof this.props.errors === "undefined" ? (
            <></>
          ) : (
            <Errorslist {...this.props.errors} />
          )}
          <h1> Admin Signin </h1>
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
              <label>Password : </label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={this.state.password}
                placeholder="password"
                onChange={this.handleOnChange}
                required
              />
            </div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LetOOcUAAAAACwrvGAIAMB0BwYkms1vZ6PtCUWt"
              onChange={this.handleCaptcha}
            />

            <div className="form-group">
              <button className="btn btn-primary">
                {" "}
                Login{" "}
              </button>{" "}
              &nbsp;
            </div>
          </form>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ SigninAction, startStopLoader }, dispatch);
};

const mapStateToProps = (state) => ({
  userInfo: state.auth.userinfo,
  errors: state.auth.errors,
  disable: state.auth.disable,
  isloading: state.auth.isloading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectAuthorized(SigninAdmin));
