import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SigninAdmin from './admin/signinAdmin';
import Users from './admin/users';
import {
  Signin,
  Signup,
  Forgot,
  VerifyToken,
  Jobs,
  Application,
  Postjobs,
  EditJob,
} from './user/index';
import { Logout } from '../main/common/logout';
import { Error404 } from '../errors/error404';
import { ROUTES } from '../utils';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Router>
    <Routes>
      <Route exact path={ROUTES.INDEX_ROUTE} element={<Jobs />} />
      <Route exact path={ROUTES.LOGOUT_ROUTE} element={Logout} />
      <Route exact path={ROUTES.SIGNIN_ROUTE} element={<Signin />} />
      <Route exact path={ROUTES.ADMIN_SIGNIN_ROUTE} element={<SigninAdmin />} />
      <Route exact path={ROUTES.SIGNUP_ROUTE} element={<Signup />} />
      <Route exact path={ROUTES.FORGOT_ROUTE} element={<Forgot />} />
      <Route exact path={ROUTES.POST_JOB_ROUTE} element={<Postjobs />} />
      <Route exact path={ROUTES.EDIT_JOB_ROUTE} element={<EditJob />} />
      <Route exact path={ROUTES.VERIFY_TOKEN_ROUTE} element={<VerifyToken />} />
      <Route exact path={ROUTES.JOB_ROUTE} element={<Jobs />} />
      <Route exact path={ROUTES.APPLICATION_ROUTE} element={<Application />} />
      <Route exact path={ROUTES.USERS_ROUTE} element={<Users />} />
      <Route exact path={ROUTES.NOT_FOUND_ROUTE} element={<Error404 />} />
    </Routes>
  </Router>
);
