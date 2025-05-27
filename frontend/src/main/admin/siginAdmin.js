import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { SigninAction, startStopLoader } from "../../actions/authActions";
import Errorslist from "../../common/errorslist";
import RedirectAuthorized from "../../hoc/redirectAuthorized";

const recaptchaRef = React.createRef();

const SigninAdmin = (props) => {

  const [form, setForm] = useState({
    email: "",
    password: "",
    disable: true,
  });

  useEffect(() => {
    document.title = "Admin Signin";
    props.startStopLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    props.SigninAction(form, "Admin");
  };

  const handleCaptcha = () => {
    setForm((prev) => ({
      ...prev,
      disable: false
    }));
  }

  if (props.isloading) {
    return (<h1>Loading</h1>)
  }

  return ((
    <div>
      <h1> Admin Signin </h1>
      <br />
      <form
        className="form-horizontal"
        onSubmit={handleOnSubmit}
        method="post"
      >
        <div className="form-group">
          <label>Email : </label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password : </label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={form.password}
            placeholder="password"
            onChange={handleOnChange}
            required
          />
        </div>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={handleCaptcha}
        />

        <div className="form-group">
          <button disabled={form.disable} className="btn btn-primary">
            Login
          </button>
          &nbsp;
        </div>
      </form>
      {typeof props.errors === "undefined" ? (
        <></>
      ) : (
        <Errorslist {...props.errors} />
      )}
    </div>
  ))

}


const mapDispatchToProps = { SigninAction, startStopLoader }

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
