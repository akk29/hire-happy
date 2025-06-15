import { Link } from 'react-router-dom';
import { FILLER as F, ROUTES } from '../utils';

export const Error404 = () => {
  const authData = localStorage.getItem(F.AUTH_DATA);
  const link =
    authData === null ? (
      <Link to={ROUTES.SIGNIN_ROUTE}> Signin </Link>
    ) : (
      <Link to="/jobs/1"> Jobs</Link>
    );

  return (
    <div>
      <h1> Page Not Found</h1>
      <br />
      {link}
    </div>
  );
};
