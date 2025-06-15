import { Navigate } from 'react-router-dom';
import { FILLER as F } from '../../utils';

const adminonly = WrappedComponent => {
  return function AdminOnlyWrapper(props) {
    const authData = localStorage.getItem(F.AUTH_DATA);
    const role = authData ? JSON.parse(authData).role : null;

    if (role !== F.SUPER_USER_ROLE) {
      return <Navigate to="/jobs/1" />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default adminonly;
