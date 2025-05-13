import React from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changePassword } from '../../actions/authActions'
import Errorslist from '../../common/errorslist'

class changepassword extends React.Component{

    constructor(){
        super()
        this.state = {
            password: '',
            confirm_password: '',            
        }
    }

    componentWillMount(){
        document.title = 'Change Password' 
    }
    
    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.changePassword(this.state)        
    }

    handleOnChange = (event) => {
        const {name,value} = event.target
        this.setState({
            [name] : value
        })
    }

    render(){
        if(this.props.redirect){
           return <Redirect to="/signin"/>
        }else{
        return(
            <div>
                {typeof(this.props.errors) === 'undefined' ? <></> : <Errorslist {... this.props.errors}/> }                
                <form className="form-horizontal" onSubmit = {this.handleOnSubmit} method="post">
                    <h1>Change Password</h1>
                    <br/>
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
                            placeholder = "Confirm Password" 
                            onChange = {this.handleOnChange}
                            required
                            />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={this.props.disable} > Change Password </button>
                    </div>                            
                </form>
            </div>
        )
    }}
}

const mapStateToProps = state =>({
    userinfo: state.auth.userinfo,
    errors: state.auth.error_password,
    redirect: state.auth.redirect,
    disable: state.auth.disable
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changePassword},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(changepassword);