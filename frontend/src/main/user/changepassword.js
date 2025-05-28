import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePassword } from '../../actions';
import { ErrorsList } from '../../common';

const ChangePassword = props => {
  document.title = 'Change Password';

  const [form, setForm] = useState({
    password: '',
    confirm_password: '',
  });

  const handleOnSubmit = event => {
    event.preventDefault();
    props.changePassword(form);
  };

  const handleOnChange = event => {
    const { name, value } = event.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (props.redirect) {
    return <Navigate to="/signin" />;
  } else {
    return (
      <div>
        <form
          className="form-horizontal"
          onSubmit={handleOnSubmit}
          method="post"
        >
          <h1>Change Password</h1>
          <br />
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
            <label>Confirm Password : </label>
            <input
              className="form-control"
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              placeholder="Confirm Password"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" disabled={props.disable}>
              Change Password
            </button>
          </div>
        </form>
        {typeof props.errors === 'undefined' ? (
          <></>
        ) : (
          <ErrorsList {...props.errors} />
        )}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  userinfo: state.auth.userinfo,
  errors: state.auth.error_password,
  redirect: state.auth.redirect,
  disable: state.auth.disable,
});

const mapDispatchToProps = { changePassword };

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
