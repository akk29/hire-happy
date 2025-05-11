import React from 'react'
import { connect } from 'react-redux'
import { VerifyTokenAction } from '../../actions/authActions'
import { bindActionCreators } from 'redux'
import Errorslist from '../../common/errorslist'
import ChangePassword from './changepassword'

class VerifyToken extends React.Component{

    componentDidMount(){
        var {uuid64 , token} = this.props.match.params
        var payload = {
            uuid64 : uuid64,
            token : token
        }          
        this.props.VerifyTokenAction(payload)
    }
   
    render(){  
        if(this.props.isloading){
            document.title = 'Verify Token' 
            return <h1>Please Wait</h1>
        }else{
            return(            
                <div>
                    {typeof(this.props.errors) === 'undefined' ? <ChangePassword/> : <Errorslist {... this.props.errors}/> }               
                </div>
            )
        }        
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({VerifyTokenAction},dispatch)
}

const mapStateToProps = state =>({
    userInfo : state.auth.userinfo,
    errors : state.auth.errors,
    isloading : state.auth.isloading
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyToken);
