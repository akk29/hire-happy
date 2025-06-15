import { Link } from 'react-router-dom';
import { FILLER as F, ROUTES } from '../../utils';

export const CommonHeader = ({ role, type }) => {
    if (type === F.JOBS) {
        if (role === F.CANDIDATE_ROLE) {
            return (
                <span className="JobHeader">
                    <Link to="/applications/1">Applications</Link>
                </span>
            );
        } else if (role === F.SUPER_USER_ROLE) {
            return (
                <span className="JobHeader">
                    <Link to="/applications/1">Applications</Link> &nbsp; &nbsp; &nbsp;
                    <Link to="/users/1">All Users</Link>
                </span>
            );
        } else {
            return (
                <span className="JobHeader">
                    <Link to={ROUTES.POST_JOB_ROUTE}>Post Job </Link> &nbsp; &nbsp; &nbsp;
                    <Link to="/applications/1">Applications</Link>
                </span>
            );
        }
    }
    if (type === F.APPLICATIONS) {
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
    }
    if (type === F.USERS) {
        return (
            <span className="JobHeader">
                <Link to="/jobs/1">Jobs</Link> &nbsp; &nbsp;
                <Link to="/applications/1">Applications</Link>
            </span>
        );
    }
    if (type === F.EDIT_JOB) {
        return (
            <span className="JobHeader">
                <Link to="/applications/1">Applications</Link> &nbsp; &nbsp; &nbsp;
                <Link to="/jobs/1">Jobs</Link>
            </span>
        );
    }
};
