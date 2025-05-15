import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChangePassword from './changepassword'
import { VerifyTokenAction } from '../../actions/authActions'
import Errorslist from '../../common/errorslist'

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
