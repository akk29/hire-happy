import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils';

// @todo
export const Logout = () => {
  localStorage.clear();
  return <Navigate to={ROUTES.AUTHENTICATE_ROUTE} />;
};
