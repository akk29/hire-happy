import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { GetApplicationsAction } from '../../actions';
import { CommonHeader, Footer, Header } from '../../common';
import Config from '../config';
import { authorized } from '../../hoc';
import { FILLER as F } from '../../utils';

const single_application = (application, offset, role) => {
  return (
    <tr key={application.uuid}>
      <td>{offset}</td>
      <td>{application.title}</td>
      <td>{application.location}</td>
      {role === F.RECRUITER_ROLE ? <td>{application.applied_by}</td> : <></>}
      {role === F.CANDIDATE_ROLE ? <td>{application.posted_by}</td> : <></>}
    </tr>
  );
};

const Applications = props => {
  const { pgno } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Applications';
    var offset = (pgno - 1) * 10;
    if (isNaN(offset)) {
      offset = 0;
    }
    props.GetApplicationsAction(
      parseInt(Config.limit_size),
      offset
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUrlandFetchApplications = (limit, offset) => {
    var pgno = offset / limit + 1;
    const url = `/applications/${pgno}`;
    navigate(url);
    props.GetApplicationsAction(
      parseInt(Config.limit_size),
      offset,
    );
  };

  if (!props.application_isloading) {
    var total = props.allapplications.metadata.resultset.count;
    var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role;
    if (total > 0) {
      var current_apps = props.allapplications.applications.length;
      if (current_apps > 0) {
        var offset = props.allapplications.metadata.resultset.offset;
        const appList = props.allapplications.applications.map(application => {
          offset += 1;
          return single_application(application, offset, role);
        });
        return (
          <div className="container">
            <CommonHeader role={role} type={F.APPLICATIONS} /> <Header />
            <h1>Applications</h1>
            <br />
            <table className="table table-striped">
              <thead>
                <tr key={'application-header'}>
                  <th>Sr. No.</th>
                  <th>Title</th>
                  <th>Location</th>
                  {role === F.RECRUITER_ROLE ? <th>Applied by</th> : <></>}
                  {role === F.CANDIDATE_ROLE ? <th>Posted by</th> : <></>}
                </tr>
              </thead>
              <tbody>{appList}</tbody>
            </table>
            <Footer
              total={total}
              action={setUrlandFetchApplications}
              current={props.current}
            />
          </div>
        );
      } else {
        return (
          <div className="container">
            <CommonHeader role={role} type={F.APPLICATIONS} />
            <Header />
            <h1> Invalid Page</h1>
            <Link to={'/applications/1'}> Go to Applications </Link>
          </div>
        );
      }
    } else {
      return (
        <div>
          <CommonHeader role={role} type={F.APPLICATIONS} />
          <Header />
          {role === F.RECRUITER_ROLE ? (
            <h1>No Application Recieved</h1>
          ) : (
            <h1>Apply for Job</h1>
          )}
        </div>
      );
    }
  } else {
    return <h1> Loading </h1>;
  }
};

const mapDispatchToProps = { GetApplicationsAction };

const mapStateToProps = state => ({
  allapplications: state.applications.allapplications,
  application_isloading: state.applications.isloading,
  authData: state.auth.userinfo,
  disable: state.applications.disable,
  current: state.applications.current,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(authorized(Applications));
