import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { getallUsers } from '../../actions';
import { Header, Footer, CommonHeader } from '../common';
import Config from '../config';
import { authorized, adminonly } from '../hoc';
import { FILLER as F } from '../../utils';

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
  var action = '-'; // not implemented on backend
  if (user.role === F.SUPER_USER_ROLE) {
    action = '-';
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
};

const Users = props => {
  const { pgno } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isloading, allusers, disable, current } = props;

  useEffect(() => {
    document.title = 'All Users';
    var offset = (pgno - 1) * 10;
    if (isNaN(offset)) {
      offset = 0;
    }
    props.getallUsers(
      offset,
      parseInt(Config.limit_size),
      props.authData.token
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const setUrlandFetchUsers = (limit, offset) => {
    var pgno = offset / limit + 1;
    const url = `/users/${pgno}`;
    navigate(url);
    props.getallUsers(
      offset,
      parseInt(Config.limit_size),
      this.props.authData.token
    );
  };

  if (!isloading) {
    const total = allusers.metadata.resultset.count;
    if (total > 0) {
      const current_users = allusers.users.length;
      if (current_users > 0) {
        let offset = allusers.metadata.resultset.offset;
        const userList = allusers.users.map(job => {
          offset += 1;
          return single_user(job, offset, disable);
        });
        return (
          <div className="container">
            <CommonHeader type={F.USERS} /> <Header />
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
              action={setUrlandFetchUsers}
              current={current}
            />
          </div>
        );
      } else {
        return (
          <div className="container">
            <CommonHeader type={F.USERS} /> <Header />
            <h1> Invalid Page</h1>
            <Link to={'/users/1'}> Go to All Users </Link>
          </div>
        );
      }
    } else {
      return <div>No User</div>;
    }
  } else {
    return <h1> Loading </h1>;
  }
};

const mapDispatchToProps = { getallUsers };

const mapStateToProps = state => ({
  isloading: state.admin.isloading,
  allusers: state.admin.allusers,
  disable: state.admin.disable,
  current: state.admin.current,
  authData: state.auth.userinfo,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(authorized(adminonly(Users)));
