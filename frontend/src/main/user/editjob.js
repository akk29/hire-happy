import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { EditJobAction } from '../../container';
import { CommonHeader, ErrorsList, Header } from '../common/';
import { authorized, recruiteronly } from '../hoc';

const EditJob = props => {
  const location = useLocation();
  const [form, setForm] = useState({
    uuid: '',
    title: '',
    description: '',
    location: '',
  });

  useEffect(() => {
    document.title = 'Edit Job';
    if (location.state !== undefined) {
      const { state } = location;
      setForm(prev => ({
        ...prev,
        uuid: state.uuid,
        title: state.title,
        description: state.description,
        location: state.location,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const handleOnChange = event => {
    const { name, value } = event.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    props.EditJobAction(form);
  };

  return (
    <div>
      <form className="form-horizontal" onSubmit={handleOnSubmit} method="post">
        <CommonHeader type={"EDIT_JOB"} /> <Header />
        <h1>Edit Job</h1>
        <div className="form-group">
          <label className="control-label col-sm-2">Title : </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="title"
              value={form.title}
              placeholder="Title"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Description : </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="description"
              value={form.description}
              placeholder="Description"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Location : </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="location"
              value={form.location}
              placeholder="Location"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-primary" disabled={props.disable}>
              Save Job
            </button>
          </div>
        </div>
      </form>
      <ErrorsList errors={props.errors} />
    </div>
  );
};

const mapDispatchToProps = { EditJobAction };

const mapStateToProps = state => ({
  redirect: state.jobs.redirect,
  errors: state.jobs.errors,
  disable: state.jobs.disable,
  authData: state.auth.userinfo,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(authorized(recruiteronly(EditJob)));
