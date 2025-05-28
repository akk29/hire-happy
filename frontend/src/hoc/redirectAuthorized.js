import { Navigate } from 'react-router-dom';
import { FILLER as F } from '../utils';

const redirectAuthorized = WrappedComponent => {
  return function RedirectAuthorizedWrapper(props) {
    const authData = JSON.parse(localStorage.getItem(F.AUTH_DATA));
    if (authData !== null) {
      return <Navigate to="/jobs/1" />;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default redirectAuthorized;
