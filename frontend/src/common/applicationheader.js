import { Link } from 'react-router-dom';
import { FILLER as F, ROUTES } from '../utils';

export const ApplicationHeader = ({ role }) => {
  if (role === F.RECRUITER_ROLE) {
    return (
      <span className="JobHeader">
        <Link to={ROUTES.POST_JOB_ROUTE}>Post Job </Link> &nbsp; &nbsp; &nbsp;
        <Link to="/jobs/1">Jobs</Link>
      </span>
    );
  } else if (role === F.SUPER_USER_ROLE) {
    return (
      <span className="JobHeader">
        <Link to="/jobs/1">Jobs</Link> &nbsp; &nbsp; &nbsp;
        <Link to="/users/1">All Users</Link>
      </span>
    );
  } else {
    return (
      <span className="JobHeader">
        <Link to="/jobs/1">Jobs</Link>
      </span>
    );
  }
};
