import { Navigate } from 'react-router-dom';
import { FILLER as F } from '../utils';

const recruiteronly = WrappedComponent => {
  return function RecruiterOnlyWrapper(props) {
    const authData = localStorage.getItem(F.AUTH_DATA);
    const role = authData ? JSON.parse(authData).role : null;
    if (role === F.RECRUITER_ROLE) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/jobs/1" />;
    }
  };
};

export default recruiteronly;
