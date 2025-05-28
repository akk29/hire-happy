import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getallUsers } from "../../actions";
import { Header, UserHeader, Footer } from "../../common";
import Config from "../config";
import { authorized, adminonly } from "../../hoc";
import { FILLER as F } from "../../utils";

const single_user = (user, offset, disable) => {
  const fullName = `${user.first_name} ${user.last_name}`;
  // var action = (
  //   <button
  //     className="btn btn-primary"
  //     disabled={disable}
  //     value={`users-${user.id}`}
  //     onClick={(e) => {
  //       if (window.confirm("Delete the item?")) {
  //         deleteObjectById(e, "value");
  //       }
  //     }}>
  //     Delete
  //   </button>
  // );
  var action = '-' // not implemented on backend 
  if (user.role === F.SUPER_USER_ROLE) {
    action = "-";
  }
  return (
    <tr key={user.uuid}>
      <td>{offset}</td>
      <td>{fullName}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{action}</td>
    </tr>
  );
}

class users extends Component {
  constructor(props) {
    super(props);
    this.setUrlandFetchUsers = this.setUrlandFetchUsers.bind(this);
  }

  componentWillMount() {
    document.title = "All Users";
    var { pgno } = this.props.match.params;
    var index = (pgno - 1) * 10;
    if (isNaN(index)) {
      index = 0;
    }
    this.props.getallUsers(parseInt(Config.offset_size), index, this.props.authData.token);
  }

  setUrlandFetchUsers(limit, offset) {
    var pgno = offset / limit + 1;
    const url = `/users/${pgno}`;
    this.props.history.push(url);
    this.props.getallUsers(parseInt(Config.offset_size), offset, this.props.authData.token);
  }

  render() {
    if (!this.props.isloading) {
      var total = this.props.allusers.metadata.resultset.count;
      if (total > 0) {
        var current_users = this.props.allusers.users.length;
        if (current_users > 0) {
          var offset = this.props.allusers.metadata.resultset.offset;
          const userList = this.props.allusers.users.map((job) => {
            offset += 1;
            return single_user(
              job,
              offset,
              this.props.disable
            );
          });
          return (
            <div className="container">
              <UserHeader /> <Header />
              <h1>All Users</h1>
              <br />
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{userList}</tbody>
              </table>
              <Footer
                total={total}
                action={this.setUrlandFetchUsers}
                current={this.props.current}
              />
            </div>
          );
        } else {
          return (
            <div className="container">
              <UserHeader />
              <Header />
              <h1> Invalid Page</h1>
              <Link to={"/applications/1"}> Go to All Applications </Link>
            </div>
          );
        }
      } else {
        return <div>No User</div>;
      }
    } else {
      return <h1> Loading </h1>;
    }
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getallUsers }, dispatch);
};

const mapStateToProps = (state) => ({
  isloading: state.admin.isloading,
  allusers: state.admin.allusers,
  disable: state.admin.disable,
  current: state.admin.current,
  authData: state.auth.userinfo
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(authorized(adminonly(users)));