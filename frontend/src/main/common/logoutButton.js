import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROUTES } from '../../utils';

const LogoutButton = (props) => {
  const [redirect, setRedirect] = useState(false);
  const handleClick = () => {
    localStorage.clear();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={ROUTES.AUTHENTICATE_ROUTE} />;
  }

  return (
    <button style={{ marginLeft: '10px' }} className="btn btn-primary" onClick={handleClick}>
      Logout
    </button>
  );
};

const mapStateToProps = state => ({
  logout: state.auth,
});

export default connect(mapStateToProps, {})(LogoutButton);
