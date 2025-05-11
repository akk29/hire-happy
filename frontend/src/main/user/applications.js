import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getallapplications } from '../../actions/applicationActions'
import { connect } from 'react-redux'
import Header from '../../common/header'
import Footer from '../../common/footer'
import Config from "../config"
import Authorized from '../../hoc/authorized'
import Applicationheader from '../../common/applicationheader'
import { deleteObjectById } from "../../actions/adminActions"
import { NotificationContainer} from 'react-notifications';
import { FILLER as F, RECRUITER_ROLE, CANDIDATE_ROLE } from '../../utils'

function single_application(application,index,role,disable,deleteObjectById) {
    return (        
            <tr key = {application.uuid}>
                <td>
                    {index}
                </td>       
                <td>
                    {application.title}             
                </td>
                   <td>
                    {application.location}  
                </td>                         
                {role === RECRUITER_ROLE ? <td>                    
                    {application.applied_by} 
                </td> : <></>}
                {role === CANDIDATE_ROLE ? <td>                    
                    {application.posted_by} 
                </td> : <></>}            
            </tr>        
    )
}

class jobs extends Component {

    constructor(props){
        super(props)        
        this.setUrlandFetchApplications = this.setUrlandFetchApplications.bind(this)                
    }

    componentDidMount(){   
        document.title = 'All Applications'                 
        var { pgno } = this.props.match.params                 
        var index = (pgno - 1 ) * 10
        if(isNaN(index)){
            index = 0
        }                    
        this.props.getallapplications(parseInt(Config.offset_size),index,this.props.authData.token)                
    }
       
    setUrlandFetchApplications(limit,offset){                
        var pgno = (offset/limit) + 1        
        const url = `/applications/${pgno}`            
        this.props.history.push(url)          
        this.props.getallapplications(parseInt(Config.offset_size),offset,this.props.authData.token)                   
    }

    render() {         
        if(!this.props.application_isloading){                        
            var total = this.props.allapplications.metadata.resultset.count
            var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role            
            if(total > 0){
                var current_apps = this.props.allapplications.applications.length                                     
                if(current_apps > 0){
                var offset = this.props.allapplications.metadata.resultset.offset
                const appList = this.props.allapplications.applications.map((application) => {
                    offset += 1
                    return single_application(application,offset,role,this.props.disable,this.props.deleteObjectById)
                })
                return (                
                    <div className="container">
                        <Applicationheader role={role}/> <Header/>
                        <h1>All Applications</h1>
                        <br/>                        
                        <table className="table table-striped">
                            <thead>
                                <tr key={'application-header'}>
                                    <th>Sr. No.</th>                                
                                    <th>Title</th>
                                    <th>Location</th>
                                    {role === RECRUITER_ROLE ?  <th>Applied by</th> : <></> }   
                                    {role === CANDIDATE_ROLE ?  <th>Posted by</th> : <></> }   
                                </tr>
                            </thead>
                            <tbody>
                                {appList}
                            </tbody>    
                                                
                        </table>
                     <Footer total={total} action={this.setUrlandFetchApplications} current={this.props.current}/>                                            
                     <NotificationContainer/>
                    </div>
                )}
                else{
                    return(
                        <div className="container">
                            <Applicationheader role={role}/><Header/>
                          <h1> Invalid Page</h1>
                          <a href="/applications/1">Go to All Applications</a> 
                        </div>
                    )
                }
            }else{
                return(
                    <div>
                        <Applicationheader role={role}/> <Header/>                    
                        <h1>Apply for Job</h1>
                    </div>
                )
            }
            
        }else{
            return (<h1> Loading </h1>)
        }    
        
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getallapplications,deleteObjectById},dispatch)
}


const mapStateToProps = state =>({
    allapplications : state.applications.allapplications,
    application_isloading : state.applications.isloading,
    authData : state.auth.userinfo,
    disable : state.applications.disable,
    current: state.applications.current
})

export default connect(mapStateToProps,mapDispatchToProps)(Authorized(jobs));