import React from 'react'
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import { SignupAction , startStopLoader} from '../../actions/authActions'
import { bindActionCreators } from 'redux'
import Errorslist from '../../common/errorslist'
import RedirectAuthorized from '../../hoc/redirectAuthorized'
import { ROUTES } from '../../utils'
class Signup extends React.Component{

   constructor(props){
        super(props);       
        this.state = {
            profiletype: 1,             
            email: '',
            first_name: '', 
            last_name: '', 
            password: '', 
            confirm_password: '',                  
        }       
   }

   componentWillMount(){
        document.title = 'Signup' 
        this.props.startStopLoader()
    }
    
    handleOnSubmit = (event) =>{
        event.preventDefault()        
        this.props.SignupAction(this.state)        
    }

    handleOnChange = (event) =>{
        var {name,value} = event.target
        const noop = () => {}
        name === "profiletype" ? value = parseInt(value) : noop()
        this.setState({
            [name] : value
        })   
    }

    render(){               
        if(!(this.props.isloading)){ 
        return(                        
            <main>
                {typeof(this.props.errors) === 'undefined' ? <></> : <Errorslist {... this.props.errors}/> }                
                <h1> Signup </h1>
                <br/>
                <form className="form-horizontal" onSubmit = {this.handleOnSubmit} method="post">
                <div className="form-group"> 
                        <label>Profile : </label>
                        <select
                        className="form-control" 
                        value={this.state.profiletype}
                        name="profiletype" 
                        onChange = {this.handleOnChange}>
                            <option value="1">Recruiter</option>
                            <option value="2">Candidate</option>
                        </select>
                </div>                
                <div className="form-group">
                        <label>Email : </label>
                        <input
                        className="form-control" 
                        type = "email" 
                        name="email"
                        value = {this.state.email}
                        placeholder = "Email Id" 
                        onChange = {this.handleOnChange}
                        required
                        />
                </div>
                <div className="form-group">
                        <label>First Name : </label>
                        <input
                        className="form-control" 
                        type = "text" 
                        name="first_name"
                        value = {this.state.first_name}
                        placeholder = "First Name" 
                        onChange = {this.handleOnChange}
                        required
                        />
                </div>
                <div className="form-group">
                        <label>Last Name : </label>
                        <input
                        className="form-control" 
                        type = "text" 
                        name="last_name"
                        value = {this.state.last_name}
                        placeholder = "Last Name" 
                        onChange = {this.handleOnChange}
                        required
                        />
                </div>
                <div className="form-group">
                        <label>Password : </label>
                        <input
                        className="form-control" 
                        type = "password" 
                        name="password"
                        value = {this.state.password}
                        placeholder = "password" 
                        onChange = {this.handleOnChange}
                        required
                        />
                </div>
                <div className="form-group">
                        <label>Confirm Password : </label>
                        <input
                        className="form-control" 
                        type = "password" 
                        name="confirm_password"
                        value = {this.state.confirm_password}
                        placeholder = "password" 
                        onChange = {this.handleOnChange}
                        required
                        />
                </div>
                
                <div className="form-group">
                   <button className="btn btn-primary" disabled={this.props.disable} > Signup </button> &nbsp;
                   <Link to={ROUTES.SIGNIN_ROUTE}>Login </Link> &nbsp; &nbsp;
                   <Link to={ROUTES.FORGOT_ROUTE}>Forgot Password </Link>
                </div>                
                
                </form>
            </main>
            
        )}else{
            return <h1> Loading</h1>
        }
    }

}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({SignupAction,startStopLoader},dispatch)
}

const mapStateToProps = state =>({
    userInfo : state.auth.userinfo,
    errors : state.auth.errors,
    disable : state.auth.disable,
    isloading : state.auth.isloading
})

export default connect(mapStateToProps, mapDispatchToProps)(RedirectAuthorized(Signup));