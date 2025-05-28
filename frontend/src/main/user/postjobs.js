import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { PostjobAction } from "../../actions/jobActions";
import { EditJobHeader, ErrorsList, Header } from "../../common/";
import Authorized from "../../hoc/authorized";
import Recruiteronly from "../../hoc/recruiteronly";

const PostJob = (props) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    document.title = "Post Job";
    // props.startStopLoader();
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.PostjobAction(form);
  };

  if (props.redirect) {
    return <Navigate to="/jobs/1" />;
  } else {
    return (
      <div className="container">
        <EditJobHeader /> <Header />
        <h1>Post Job</h1>
        <form
          className="form-horizontal"
          onSubmit={handleOnSubmit}
          method="post"
        >
          <br />
          <div className="form-group">
            <label className="control-label col-sm-2">Title : </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                name="title"
                value={form.title}
                placeholder="title"
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
                Post Job
              </button>
            </div>
          </div>
        </form>
        {typeof props.errors === "undefined" ? (
          <></>
        ) : (
          <ErrorsList {...props.errors} />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = { PostjobAction };

const mapStateToProps = (state) => ({
  redirect: state.jobs.redirect,
  errors: state.jobs.errors,
  disable: state.jobs.disable,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authorized(Recruiteronly(PostJob)));
