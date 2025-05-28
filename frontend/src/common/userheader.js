import { Link } from "react-router-dom";

export const UserHeader = () => {
  return (
    <span className="JobHeader">
      <Link to="/applications/1">All Applications</Link>  &nbsp; &nbsp; &nbsp;
      <Link to="/jobs/1">All Jobs</Link>
    </span>
  );
};