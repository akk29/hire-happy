import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { EditjobAction } from "../../actions/jobActions";
import Editjobheader from "../../common/editjobheader";
import Errorslist from "../../common/errorslist";
import Header from "../../common/header";
import Authorized from "../../hoc/authorized";
import Recruiteronly from "../../hoc/recruiteronly";

const EditJob = (props) => {
  const location = useLocation();
  const [form, setForm] = useState({
    uuid: "",
    title: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    document.title = "Edit Job";
    if (location.state !== undefined) {
      const { state } = location;
      setForm((prev) => ({
        ...prev,
        uuid: state.uuid,
        title: state.title,
        description: state.description,
        location: state.location,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm({
      [name]: value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.EditjobAction(form);
  };

  return (
    <div>
      <form className="form-horizontal" onSubmit={handleOnSubmit} method="post">
        <Editjobheader /> <Header />
        <h1>Edit Job</h1>
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
              Save Job
            </button>
          </div>
        </div>
      </form>
      {typeof props.errors === "undefined" ? (
        <></>
      ) : (
        <Errorslist {...props.errors} />
      )}
    </div>
  );
}

const mapDispatchToProps = { EditjobAction };

const mapStateToProps = (state) => ({
  redirect: state.jobs.redirect,
  errors: state.jobs.errors,
  disable: state.jobs.disable,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authorized(Recruiteronly(EditJob)));
