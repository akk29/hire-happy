import { Navigate } from 'react-router-dom';
import { FILLER as F, ROUTES } from '../../utils';

const authorized = WrappedComponent => {
  return function AuthorizedWrapper(props) {
    const authData = JSON.parse(localStorage.getItem(F.AUTH_DATA));
    if (authData === null) {
      return <Navigate to={ROUTES.SIGNIN_ROUTE} />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default authorized;
