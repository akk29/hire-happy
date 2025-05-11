import React from 'react'
import { connect } from 'react-redux'
import { SigninAction , startStopLoader } from '../../actions/authActions'
import { bindActionCreators } from 'redux'
import Errorslist from '../../common/errorslist'
import RedirectAuthorized from '../../hoc/redirectAuthorized'
import { ROUTES } from '../../utils'

class Signin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',                     
        }               
    }
    componentWillMount(){
        document.title = 'Signin'  
        this.props.startStopLoader()       
    }
    
    handleOnSubmit = (event) => {
        event.preventDefault()        
        this.props.SigninAction(this.state,'user')
    }

    handleOnChange = (event) => {
        const {name,value} = event.target
        this.setState({
            [name] : value
        })
    }
    
    render(){          
        if(!(this.props.isloading)){                
        return(
            <div>                           
                {typeof(this.props.errors) === 'undefined' ? <></> : <Errorslist {... this.props.errors}/> }                
                <h1> Signin </h1>
                <br/>
                <form className="form-horizontal" onSubmit = {this.handleOnSubmit} method="post">
                    <div className="form-group">
                            <label>Email : </label>
                            <input
                            className="form-control" 
                            type = "email" 
                            name="email"
                            value = {this.state.email}
                            placeholder = "Email" 
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
                        <button className="btn btn-primary" disabled={this.props.disable}> Login </button> &nbsp;
                        <a href={ROUTES.SIGNUP_ROUTE}>Register</a>                          
                    </div> 
                </form>
            </div>
        )}else{
            return (<h1> Loading </h1>)
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({SigninAction,startStopLoader},dispatch)
}


const mapStateToProps = state =>({
    isloading : state.auth.isloading,
    userInfo : state.auth.userinfo,
    errors : state.auth.errors,
    disable : state.auth.disable
})



export default connect(mapStateToProps,mapDispatchToProps)(RedirectAuthorized(Signin))
