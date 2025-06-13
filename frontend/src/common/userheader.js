import { Link } from 'react-router-dom';

export const UserHeader = () => {
  return (
    <span className="JobHeader">
      <Link to="/applications/1">Applications</Link> &nbsp; &nbsp; &nbsp;
      <Link to="/jobs/1">Jobs</Link>
    </span>
  );
};
