import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NotificationContainer} from 'react-notifications';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Config from "../config"
import { getalljobs ,applyjob } from '../../actions/jobActions'
import Footer from '../../common/footer'
import Header from '../../common/header'
import Jobheader from '../../common/jobheader'
import Authorized from '../../hoc/authorized'
import { FILLER as F } from '../../utils'

const single_jobs = (job,index,role,applyjob,disable,token) => {    
    var action;
    if(role === F.SUPER_USER_ROLE){
        // action = <button className="btn btn-primary" disabled={disable} value={`jobs-${job.uuid}`} onClick = {(e) => {if(window.confirm('Delete the item?')){deleteObjectById(e,"value")};}}>Delete</button>
        // not implemented in the backend
        action = '-'
    }else if(role === F.CANDIDATE_ROLE){
        action =  <button className="btn btn-primary" disabled={disable} value={`${job.uuid}-----${token}`} onClick = {(e) => applyjob(e,"value")}>Apply</button>
    }else if (role === F.RECRUITER_ROLE){
        action = <Link to={{
            pathname: '/editjob',
            state: {
              id: job.uuid,
              title: job.title,              
              description: job.description,
              location: job.location
            }
          }}>Edit</Link>
    } 
    return (        
            <tr key = {`job-id - ${job.uuid}`}>
                <td>
                    {index}
                </td>       
                <td>
                    {job.title}             
                </td>
                <td>
                    {job.description} 
                </td> 
                <td>
                    {job.location}  
                </td> 
                <td>
                    {action}
                </td>                                                                                     
            </tr>        
    )
}


class jobs extends Component {

    constructor(props){
        super(props)        
        this.setUrlandFetchJobs = this.setUrlandFetchJobs.bind(this)
        this.sleep = this.sleep.bind(this)
    }

    componentDidMount(){            
        document.title = 'All Jobs' 
        var { pgno } = this.props.match.params                 
        var index = (pgno - 1 ) * 10
        if(isNaN(index)){
            index = 0
        }         
        this.props.getalljobs(parseInt(Config.offset_size),index,this.props.authData.token)        
    }


    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
        currentDate = Date.now();
            } while (currentDate - date < milliseconds);
    }


    setUrlandFetchJobs(limit,offset){        
        var pgno = (offset/limit) + 1        
        const url = `/jobs/${pgno}`            
        this.props.history.push(url)         
        this.props.getalljobs(parseInt(Config.offset_size),offset,this.props.authData.token)
    }

    render() {          
        if(this.props.redirect){                                    
            return window.location.href = "/jobs/1"
        }                
        if(!(this.props.isloading)){            
            var total = this.props.alljobs.metadata.resultset.count                      
            if(total > 0){
                var current_jobs = this.props.alljobs.jobs.length   
                if(current_jobs > 0){
                    var offset = this.props.alljobs.metadata.resultset.offset                
                    var role = this.props.authData.role                    
                    const jobsList = this.props.alljobs.jobs.map((job) => {
                        offset += 1
                        return single_jobs(job,offset,role,this.props.applyjob,this.props.disable,this.props.authData.token)
                    })                
                    return (                
                        <div className="container">
                            <Jobheader role={role}/><Header/>
                            <h1>All Jobs</h1>
                            <br/>
                            <table className="table table-striped">
                                <thead>
                                        <tr key={'job-header'}>
                                            <th>Sr. No.</th>                                
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Location</th>                                              
                                            <th>Action</th>                                        
                                        </tr>
                                </thead>
                                <tbody>
                                    {jobsList}
                                </tbody>                            
                            </table>
                        <Footer total={total} action={this.setUrlandFetchJobs} current={this.props.current}/>                                            
                        <NotificationContainer/>
                        </div>
                )}
                else{
                    role = this.props.authData.role                    
                    return(
                        <div className="container">
                             <Jobheader role={role}/><Header/>
                          <h1> Invalid Page</h1>
                          <a href="/jobs/1">Go to All Jobs</a> 
                        </div>
                    )
                }
            }else{
                role = this.props.authData.role                    
                return(
                    <div className="container">
                         <Jobheader role={role}/><Header/>
                      <h1>No Jobs Available</h1>
                    </div>
                )
            }
            
        }else{
            return (<h1> Loading </h1>)
        }    
        
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getalljobs,applyjob},dispatch)
}


const mapStateToProps = state =>({    
    authData: state.auth.userinfo,
    isloading: state.jobs.isloading,
    alljobs: state.jobs.alljobs,    
    redirect: state.jobs.redirect,
    disable: state.auth.disable,
    current: state.jobs.current
})

export default connect(mapStateToProps,mapDispatchToProps)(Authorized(jobs));