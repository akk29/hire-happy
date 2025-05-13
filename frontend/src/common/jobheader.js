import React, { Component } from 'react'
import {Link} from "react-router-dom";
import { FILLER as F, ROUTES } from '../utils';


export default class jobheader extends Component {    
    constructor(props){        
        super(props)                
        this.state = {
            role : this.props.role
        }                
    }
    render() {        
        if(this.props.role === F.CANDIDATE_ROLE){        
        return (
            <span className="JobHeader">                                             
                <Link to="/applications/1">All Applications</Link>            
            </span>            
        )
    }else if(this.props.role === F.SUPER_USER_ROLE){
        return(
            <span className="JobHeader">           
                <Link to="/applications/1">All Applications</Link> &nbsp; &nbsp; &nbsp;
                <Link to="/users/1">All Users</Link>           
            </span>
        )
    }
    else{
        return(
            <span className="JobHeader">      
                <Link to={ROUTES.POST_JOB_ROUTE}>Post Job </Link> &nbsp; &nbsp; &nbsp;          
                <Link to="/applications/1">All Applications</Link>          
            </span>
        )
    }
    }
}
