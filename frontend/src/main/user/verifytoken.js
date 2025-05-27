import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import ChangePassword from "./changepassword";
import { VerifyTokenAction } from "../../actions/authActions";
import Errorslist from "../../common/errorslist";

const VerifyToken = (props) => {

  document.title = "Verify Token";
  const { uuid64, token } = useParams();

  useEffect(() => {
    props.VerifyTokenAction({
      uuid64: uuid64,
      token: token,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.isloading) {
    return <h1>Please Wait</h1>;
  } else {
    return (
      <div>
        {typeof props.errors === "undefined" ? (
          <ChangePassword />
        ) : (
          <Errorslist {...props.errors} />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = { VerifyTokenAction };

const mapStateToProps = (state) => ({
  userInfo: state.auth.userinfo,
  errors: state.auth.errors,
  isloading: state.auth.isloading,
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyToken);
