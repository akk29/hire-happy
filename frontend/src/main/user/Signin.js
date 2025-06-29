import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SigninAction, startStopLoader } from '../../container';
import { ErrorsList } from '../common';
import { redirectAuthorized } from '../hoc';
import { ROUTES } from '../../utils';

const Signin = props => {
  const [signInform, setSignInForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    document.title = 'Signin';
    props.startStopLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (props.isloading) {
    return <h1>Loading</h1>;
  }

  return (
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
          <Link reloadDocument to={ROUTES.AUTHENTICATE_ROUTE}>Register</Link> &nbsp; &nbsp;
          <Link reloadDocument to={ROUTES.FORGOT_ROUTE}>Forgot Password</Link>
        </div>
      </form>
      <ErrorsList errors={props.errors}/>
    </div>
  );
};

const mapDispatchToProps = { SigninAction, startStopLoader };

const mapStateToProps = state => ({
  isloading: state.auth.isloading,
  userInfo: state.auth.userinfo,
  errors: state.auth.errors,
  disable: state.auth.disable,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(redirectAuthorized(Signin));
