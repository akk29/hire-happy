import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ForgotAction } from '../../container';
import { ErrorsList } from '../common';
import { ROUTES } from '../../utils';

const Forgot = props => {
  document.title = 'Forgot Password';

  const [form, setForm] = useState({
    email: '',
    confirm_password: '',
  });

  const handleOnSubmit = event => {
    event.preventDefault();
    props.ForgotAction(form);
  };

  const handleOnChange = event => {
    const { name, value } = event.target;
    setForm({
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
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
          <button className="btn btn-primary" disabled={props.disabled}>
            Send Link
          </button>
          &nbsp; &nbsp;
          <Link reloadDocument to={ROUTES.SIGNIN_ROUTE}> Login </Link> &nbsp; &nbsp;
          <Link reloadDocument to={ROUTES.SIGNUP_ROUTE}> Register </Link>
        </div>
      </form>
       <ErrorsList errors={props.errors} />
    </div>
  );
};

const mapDispatchToProps = { ForgotAction };

const mapStateToProps = state => ({
  userInfo: state.auth.userinfo,
  errors: state.auth.errors,
  disabled: state.auth.disable,
});

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
