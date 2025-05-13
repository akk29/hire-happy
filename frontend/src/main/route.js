import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import {
  Signin,
  Signup,
  Forgot,
  VerifyToken,
  Jobs,
  Application,
} from "./user/index";
import SiginAdmin from "./admin/siginAdmin";
import Users from "./admin/users";
import Logout from "../common/logout";
import Error404 from "../errors/error404";
import Postjobs from "./user/postjobs";
import Editjob from "./user/editjob";
import { ROUTES } from "../utils";

export default () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.INDEX_ROUTE} component={Jobs} />
      <Route exact path={ROUTES.LOGOUT_ROUTE} component={Logout} />
      <Route exact path={ROUTES.SIGNIN_ROUTE} component={Signin} />
      <Route exact path={ROUTES.ADMIN_SIGNIN_ROUTE} component={SiginAdmin} />
      <Route exact path={ROUTES.SIGNUP_ROUTE} component={Signup} />
      <Route exact path={ROUTES.FORGOT_ROUTE} component={Forgot} />
      <Route exact path={ROUTES.POST_JOB_ROUTE} component={Postjobs} />
      <Route exact path={ROUTES.EDIT_JOB_ROUTE} component={Editjob} />
      <Route exact path={ROUTES.VERIFY_TOKEN_ROUTE} component={VerifyToken} />
      <Route exact path={ROUTES.JOB_ROUTE} component={Jobs} />
      <Route exact path={ROUTES.APPLICATION_ROUTE} component={Application} />
      <Route exact path={ROUTES.USERS_ROUTE} component={Users} />
      <Route exact path={ROUTES.NOT_FOUND_ROUTE} component={Error404} />
    </Switch>
  </Router>
);
