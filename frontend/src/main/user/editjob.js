import React from 'react'
import Errorslist from '../../common/errorslist'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {EditjobAction} from "../../actions/jobActions"
import Authorized from '../../hoc/authorized'
import { Redirect } from 'react-router-dom'
import Recruiteronly from '../../hoc/recruiteronly'
import Editjobheader from '../../common/editjobheader'
import Header from '../../common/header'
import { NotificationContainer } from 'react-notifications';


class editjob extends React.Component{

    constructor(props) {
        console.log(props)
        super(props)        
        if(this.props.location.state !== undefined){
            this.state = {
                uuid : this.props.location.state.id,
                title : this.props.location.state.title,
                description : this.props.location.state.description,
                location: this.props.location.state.location,            
            }
        }else{
            this.state = {
                uuid : ''
            }
        }
        
        this.sleep = this.sleep.bind(this)
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
        currentDate = Date.now();
            } while (currentDate - date < milliseconds);
    }

    componentWillMount(){
        document.title = 'Edit Job' 
    }

    handleOnChange = (event) => {   
        const {name,value}  = event.target
        this.setState({
            [name] : value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.EditjobAction(this.state)        
    }
   
    render() {           
        if(this.props.redirect || this.state.uuid === ''){            
            return <Redirect to="/jobs/1"/>
        }else{                   
        return(
            <div>                      
                {typeof(this.props.errors) === 'undefined' ? <></> : <Errorslist {... this.props.errors}/> }     
                          
                <form className="form-horizontal" onSubmit = {this.handleOnSubmit} method="post">                                    
                <Editjobheader/> <Header/>
                <h1>Edit Job</h1>
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
                            <button className="btn btn-primary" disabled={this.props.disable}> Save Job </button>
                        </div>     
                    </div>                
                    </form>
                    <NotificationContainer/>
            </div>            
        )}       
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({EditjobAction},dispatch)
}


const mapStateToProps = state =>({
    redirect : state.jobs.redirect,
    errors : state.jobs.errors,
    disable : state.jobs.disable
})

export default connect(mapStateToProps,mapDispatchToProps)(Authorized(Recruiteronly(editjob)))
