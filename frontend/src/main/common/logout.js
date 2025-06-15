import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils';

export const Logout = () => {
  localStorage.clear();
  return <Navigate to={ROUTES.SIGNIN_ROUTE} />;
};
