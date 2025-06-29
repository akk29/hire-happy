import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SigninAction ,SignupAction, startStopLoader } from '../../container';
import { ErrorsList } from '../common';
import { redirectAuthorized } from '../hoc';
import { ROUTES } from '../../utils';

const Signup = props => {
  const [form, setForm] = useState({
    profiletype: 1,
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });

    const [signInform, setSignInForm] = useState({
    email: '',
    password: '',
  });

  const handleOnSignInChange = event => {
    const { name, value } = event.target;
    setSignInForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSignInSubmit = event => {
    event.preventDefault();
    props.SigninAction(signInform, 'user');
  };

  useEffect(() => {
    document.title = 'Signup';
    props.startStopLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = event => {
    var { name, value } = event.target;
    const noop = () => {};
    name === 'profiletype' ? (value = parseInt(value)) : noop();
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    props.SignupAction(form);
  };

  if (props.isloading) {
    return <h1>Loading</h1>;
  }

  return (
    <main>
      <h1 style={{ 'margin-bottom': '20px' }}> Signup </h1>
      <form className="row" onSubmit={handleOnSubmit} method="post">
        <div className="col-lg-4 col-md-4">
          <label for="firstName" class="form-label">
            First Name :
          </label>
          <input
            id="firstName"
            className="form-control"
            type="text"
            name="first_name"
            value={form.first_name}
            placeholder="First Name"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="col-lg-4 col-md-4">
          <label for="lastName" className="form-label">
            Last Name :
          </label>
          <input
            id="lastName"
            className="form-control"
            type="text"
            name="last_name"
            value={form.last_name}
            placeholder="Last Name"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="col-lg-4 col-md-4">
          <label for="profile" className="form-label">
            Profile :
          </label>
          <select
            id="profile"
            className="form-control"
            value={form.profiletype}
            name="profiletype"
            onChange={handleOnChange}
          >
            <option value="1">Recruiter</option>
            <option value="2">Candidate</option>
          </select>
        </div>
        <div style={{ 'margin-top': '75px' }}>
          <div className="col-md-4">
            <label for="email" className="form-label">
              Email :
            </label>
            <input
              id="email"
              className="form-control"
              type="email"
              name="email"
              value={form.email}
              placeholder="Email Id"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Password : </label>
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
          <div className="col-md-4">
            <label>Confirm Password : </label>
            <input
              className="form-control"
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              placeholder="password"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
        <div className="col-md-1">
          <button
            className="btn btn-primary signup-btn"
            disabled={props.disable}
          >
            Signup
          </button>
        </div>
        {/* <div className="col-md-11 signup-alt">
          <Link reloadDocument to={ROUTES.SIGNIN_ROUTE}>
            Login
          </Link>
          &nbsp;
          <Link reloadDocument to={ROUTES.FORGOT_ROUTE}>
            Forgot Password
          </Link>
        </div> */}
      </form>
      <ErrorsList errors={props.errors} />


    <div>
      <h1> Signin </h1>
      <br />
      <form className="row g-3" onSubmit={handleOnSignInSubmit} method="post">
        <div className="col-lg-6 col-md-6">
          <label>Email : </label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={signInform.email}
            placeholder="Email"
            onChange={handleOnSignInChange}
            required
          />
        </div>
        <div className="col-lg-6 col-md-6">
          <label>Password : </label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={signInform.password}
            placeholder="password"
            onChange={handleOnSignInChange}
            required
          />
        </div>
   
        <div className="col-lg-4 col-md-4 signin-btn">
          <button className="btn btn-primary" disabled={props.disable}>
            Login
          </button>
          &nbsp;&nbsp;
          {/* <Link reloadDocument to={ROUTES.AUTHENTICATE_ROUTE}>Register</Link> &nbsp; &nbsp; */}
          <Link reloadDocument to={ROUTES.FORGOT_ROUTE}>Forgot Password</Link>
        </div>
      </form>
      <ErrorsList errors={props.errors}/>
    </div>
    </main>
  );
};

const mapDispatchToProps = {SigninAction, SignupAction, startStopLoader };

const mapStateToProps = state => ({
  userInfo: state.auth.userinfo,
  errors: state.auth.errors,
  disable: state.auth.disable,
  isloading: state.auth.isloading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(redirectAuthorized(Signup));
