import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { SignupAction, startStopLoader } from '../../actions/authActions'
import { ErrorsList } from '../../common'
import RedirectAuthorized from '../../hoc/redirectAuthorized'
import { ROUTES } from '../../utils'

const Signup = (props) => {

    const [form, setForm] = useState({
        profiletype: 1,
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
    });

    useEffect(() => {
        document.title = "Signup";
        props.startStopLoader();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnChange = (event) => {
        var { name, value } = event.target
        const noop = () => { }
        name === "profiletype" ? value = parseInt(value) : noop()
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleOnSubmit = (event) => {
        event.preventDefault()
        props.SignupAction(form)
    }


    if (props.isloading) {
        return <h1>Loading</h1>;
    }

    return ((
        <main>
            <h1> Signup </h1>
            <br />
            <form className="form-horizontal" onSubmit={handleOnSubmit} method="post">
                <div className="form-group">
                    <label>Profile : </label>
                    <select
                        className="form-control"
                        value={form.profiletype}
                        name="profiletype"
                        onChange={handleOnChange}>
                        <option value="1">Recruiter</option>
                        <option value="2">Candidate</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Email : </label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={form.email}
                        placeholder="Email Id"
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>First Name : </label>
                    <input
                        className="form-control"
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        placeholder="First Name"
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name : </label>
                    <input
                        className="form-control"
                        type="text"
                        name="last_name"
                        value={form.last_name}
                        placeholder="Last Name"
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password : </label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={form.password}
                        placeholder="password"
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password : </label>
                    <input
                        className="form-control"
                        type="password"
                        name="confirm_password"
                        value={form.confirm_password}
                        placeholder="password"
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary" disabled={props.disable} > Signup </button> &nbsp;
                    <Link to={ROUTES.SIGNIN_ROUTE}>Login </Link> &nbsp; &nbsp;
                    <Link to={ROUTES.FORGOT_ROUTE}>Forgot Password </Link>
                </div>

            </form>
            {typeof (props.errors) === 'undefined' ? <></> : <ErrorsList {...props.errors} />}
        </main>

    ))
}

const mapDispatchToProps = { SignupAction, startStopLoader }

const mapStateToProps = state => ({
    userInfo: state.auth.userinfo,
    errors: state.auth.errors,
    disable: state.auth.disable,
    isloading: state.auth.isloading
})

export default connect(mapStateToProps, mapDispatchToProps)(RedirectAuthorized(Signup));