import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { SigninAction, startStopLoader } from "../../actions/authActions";
import Errorslist from "../../common/errorslist";
import RedirectAuthorized from "../../hoc/redirectAuthorized";
import { ROUTES } from "../../utils";

function Signin(props) {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Signin";
    props.startStopLoader();
  },[]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.SigninAction(form, "user");
  };

  if (props.isloading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      {typeof props.errors === "undefined" ? (
        <></>
      ) : (
        <Errorslist {...props.errors} />
      )}
      <h1> Signin </h1>
      <br />
      <form className="form-horizontal" onSubmit={handleOnSubmit} method="post">
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
        <div className="form-group">
          <button className="btn btn-primary" disabled={props.disable}>
            Login
          </button>
          &nbsp;
          <Link to={ROUTES.SIGNUP_ROUTE}> Register </Link> &nbsp; &nbsp;
          <Link to={ROUTES.FORGOT_ROUTE}>Forgot Password </Link>
        </div>
      </form>
    </div>
  );
}


const mapStateToProps = state => ({
  isloading: state.auth.isloading,
  userInfo: state.auth.userinfo,
  errors: state.auth.errors,
  disable: state.auth.disable
});

const mapDispatchToProps = { SigninAction, startStopLoader };

export default connect(mapStateToProps,mapDispatchToProps)(RedirectAuthorized(Signin))
