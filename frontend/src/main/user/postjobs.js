import React from 'react'
import { NotificationContainer , NotificationManager} from 'react-notifications';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {PostjobAction} from "../../actions/jobActions"
import Editjobheader from '../../common/editjobheader'
import Errorslist from '../../common/errorslist'
import Header from '../../common/header'
import Authorized from '../../hoc/authorized'
import Recruiteronly from '../../hoc/recruiteronly'

class postjob extends React.Component{

    constructor() {
        super()
        this.state = {
            title : '',
            description : '',
            location: '',            
        }
        this.notify = this.notify.bind(this)
    }

    componentWillMount(){
        document.title = 'Post Job' 
    }

    handleOnChange = (event) => {   
        const {name,value}  = event.target
        this.setState({
            [name] : value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.PostjobAction(this.state)        
    }

    notify(){
        NotificationManager.success('Posted')
    }
   
    render() {   
        if(this.props.redirect){            
            return <Redirect to="/jobs/1"/>
        }else{                   
        return(
            <div className="container">                      
                {typeof(this.props.errors) === 'undefined' ? <></> : <Errorslist {... this.props.errors}/> }                                
                <Editjobheader/> <Header/>
                <h1>Post Job</h1>
                <form className="form-horizontal" onSubmit = {this.handleOnSubmit} method="post">                                                    
                <br/>
                    <div className="form-group">      
                            <label className="control-label col-sm-2">Title : </label>
                            <div className="col-sm-10">
                            <input
                            className="form-control" 
                            type = "text" 
                            name="title"
                            value = {this.state.title}
                            placeholder = "title" 
                            onChange = {this.handleOnChange}
                            required
                            />
                            </div>
                    </div>
                    <div className="form-group">
                            <label className="control-label col-sm-2">Description : </label>
                            <div className="col-sm-10">
                            <input
                            className="form-control" 
                            type = "text" 
                            name="description"
                            value = {this.state.description}
                            placeholder = "Description" 
                            onChange = {this.handleOnChange}
                            required
                            />
                            </div>
                    </div>
                    <div className="form-group">
                            <label className="control-label col-sm-2">Location : </label>
                            <div className="col-sm-10">
                            <input
                            className="form-control" 
                            type = "text" 
                            name="location"
                            value = {this.state.location}
                            placeholder = "Location" 
                            onChange = {this.handleOnChange}
                            required
                            />
                            </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-primary" disabled={this.props.disable}> Post Job </button>
                        </div>     
                    </div>                
                    </form>
                    <NotificationContainer/>
            </div>            
        )}       
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({PostjobAction},dispatch)
}


const mapStateToProps = state =>({
    redirect : state.jobs.redirect,
    errors : state.jobs.errors,
    disable : state.jobs.disable
})

export default connect(mapStateToProps,mapDispatchToProps)(Authorized(Recruiteronly(postjob)))
