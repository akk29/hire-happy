import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { getallapplications } from "../../actions/applicationActions";
import Header from "../../common/header";
import Footer from "../../common/footer";
import Applicationheader from "../../common/applicationheader";
import Config from "../config";
import Authorized from "../../hoc/authorized";
import { FILLER as F } from "../../utils";

const single_application = (application, index, role) => {
  return (
    <tr key={application.uuid}>
      <td>{index}</td>
      <td>{application.title}</td>
      <td>{application.location}</td>
      {role === F.RECRUITER_ROLE ? <td>{application.applied_by}</td> : <></>}
      {role === F.CANDIDATE_ROLE ? <td>{application.posted_by}</td> : <></>}
    </tr>
  );
};

function Applications(props) {
  const { pgno } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "All Applications";
    var index = (pgno - 1) * 10;
    if (isNaN(index)) {
      index = 0;
    }
    props.getallapplications(
      parseInt(Config.offset_size),
      index,
      props.authData.token
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUrlandFetchApplications = (limit, offset) => {
    var pgno = offset / limit + 1;
    const url = `/applications/${pgno}`;
    navigate(url);
    props.getallapplications(
      parseInt(Config.offset_size),
      offset,
      props.authData.token
    );
  };

  if (!props.application_isloading) {
    var total = props.allapplications.metadata.resultset.count;
    var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role;
    if (total > 0) {
      var current_apps = props.allapplications.applications.length;
      if (current_apps > 0) {
        var offset = props.allapplications.metadata.resultset.offset;
        const appList = props.allapplications.applications.map(
          (application) => {
            offset += 1;
            return single_application(application, offset, role);
          }
        );
        return (
          <div className="container">
            <Applicationheader role={role} /> <Header />
            <h1>All Applications</h1>
            <br />
            <table className="table table-striped">
              <thead>
                <tr key={"application-header"}>
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
            <NotificationContainer />
          </div>
        );
      } else {
        return (
          <div className="container">
            <Applicationheader role={role} />
            <Header />
            <h1> Invalid Page</h1>
            <Link to={"/applications/1"}> Go to All Applications </Link>
          </div>
        );
      }
    } else {
      return (
        <div>
          <Applicationheader role={role} /> <Header />
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
}

const mapDispatchToProps = { getallapplications };

const mapStateToProps = (state) => ({
  allapplications: state.applications.allapplications,
  application_isloading: state.applications.isloading,
  authData: state.auth.userinfo,
  disable: state.applications.disable,
  current: state.applications.current,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authorized(Applications));
