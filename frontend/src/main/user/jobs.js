import { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { GetJobsAction, ApplyJobAction } from '../../actions';
import { Header, Footer, CommonHeader } from '../common';
import Config from '../config';
import { authorized } from '../hoc';
import { FILLER as F, ROUTES } from '../../utils';

/**
 * TODO
 * FIRST TIME
 1. Initalize State
 2. Start Loader 
 3. Load jobs
 4. stop loader

 * AFTER APPLYING
 1. 
*/

const single_jobs = (job, index, role, ApplyJobAction, disable) => {
  var action;
  if (role === F.SUPER_USER_ROLE) {
    // action = <button className="btn btn-primary" disabled={disable} value={`jobs-${job.uuid}`} onClick = {(e) => {if(window.confirm('Delete the item?')){deleteObjectById(e,"value")};}}>Delete</button>
    // not implemented in the backend
    action = '-';
  } else if (role === F.CANDIDATE_ROLE) {
    action = (
      <button
        className="btn btn-primary"
        disabled={disable}
        value={`${job.uuid}`}
        onClick={e => ApplyJobAction(e, 'value')}
      >
        Apply
      </button>
    );
  } else if (role === F.RECRUITER_ROLE) {
    action = (
      <Link
        to={ROUTES.EDIT_JOB_ROUTE}
        state={{
          uuid: job.uuid,
          title: job.title,
          description: job.description,
          location: job.location,
        }}
      >
        Edit
      </Link>
    );
  }
  return (
    <tr key={`job-id - ${job.uuid}`}>
      <td>{index}</td>
      <td>{job.title}</td>
      <td>{job.description}</td>
      <td>{job.location}</td>
      <td>{action}</td>
    </tr>
  );
};

const Jobs = props => {
  const { pgno } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
     document.title = 'Jobs';
    var offset = (pgno - 1) * Config.limit_size;
    if (isNaN(offset)) {
      offset = 0;
    }
    props.GetJobsAction(offset, parseInt(Config.limit_size));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const setUrlandFetchJobs = (limit, offset) => {
    var pgno = offset / limit + 1;
    const url = `/jobs/${pgno}`;
    navigate(url);
    props.GetJobsAction(offset, parseInt(Config.limit_size));
  };

  if (props.redirect) {
    return (window.location.href = '/jobs/1');
  }

  if (!props.isloading) {
    var total = props.alljobs.metadata.resultset.count;
    if (total > 0) {
      var current_jobs = props.alljobs.jobs.length;
      if (current_jobs > 0) {
        var offset = props.alljobs.metadata.resultset.offset;
        var role = props.authData.role;
        const jobsList = props.alljobs.jobs.map(job => {
          offset += 1;
          return single_jobs(
            job,
            offset,
            role,
            props.ApplyJobAction,
            props.disable,
          );
        });
        return (
          <div className="container">
            <CommonHeader role={role} type={F.JOBS}/>
            <Header />
            <h1>Jobs - {total}</h1>
            <br />
            <table className="table table-striped">
              <thead>
                <tr key={'job-header'}>
                  <th>Sr. No.</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{jobsList}</tbody>
            </table>
            <Footer
              total={total}
              action={setUrlandFetchJobs}
              current={props.current}
            />
          </div>
        );
      } else {
        role = props.authData.role;
        return (
          <div className="container">
            <CommonHeader role={role} type={F.JOBS}/>
            <Header />
            <h1> Invalid Page</h1>
            <Link to={'/jobs/1'}> Go to Jobs </Link>
          </div>
        );
      }
    } else {
      role = props.authData.role;
      return (
        <div className="container">
          <CommonHeader role={role} type={F.JOBS}/>
          <Header />
          {role === F.RECRUITER_ROLE ? (
            <h1>No Jobs Posted</h1>
          ) : (
            <h1>No Jobs Available</h1>
          )}
        </div>
      );
    }
  } else {
    return <h1> Loading </h1>;
  }
};

const mapDispatchToProps = { GetJobsAction, ApplyJobAction };

const mapStateToProps = state => ({
  authData: state.auth.userinfo,
  isloading: state.jobs.isloading,
  alljobs: state.jobs.alljobs,
  redirect: state.jobs.redirect,
  disable: state.auth.disable,
  current: state.jobs.current,
});

export default connect(mapStateToProps, mapDispatchToProps)(authorized(Jobs));
