import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { logoutAction } from '../actions/authActions';
import { ROUTES } from '../utils';

const LogoutButton = () => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.clear();
    dispatch(logoutAction());
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={ROUTES.SIGNIN_ROUTE} />;
  }

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Logout
    </button>
  );
};

const mapStateToProps = state => ({
  logout: state.auth,
});

const mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
