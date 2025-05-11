import { ACTION } from "../constants/actionTypes";
import Config from "../main/config"
import { NotificationManager} from 'react-notifications';
import { FILLER as F, CREATED, SUCCESS, SUPER_USER_ROLE } from "../utils";


function sleepPromise (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


export const getalljobs = (limit,offset,token) => (dispatch) =>{        
    dispatch( { type:ACTION.ISLOADING_JOBS})
    var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role
    var hit_url = ''
    if(role === SUPER_USER_ROLE){
        hit_url = `/api/v1/admin/jobs?limit=${limit}&offset=${offset}`
    }else{
        hit_url = `/api/v1/jobs?limit=${limit}&offset=${offset}`
    }
    const url = Config.base_url + hit_url              
    fetch(url,{
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },        
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type:ACTION.ALLJOBS, payload:data })        
      dispatch({ type:ACTION.ISLOADED_JOBS })  
      dispatch({ type:ACTION.CURRENT , payload : (offset/parseInt(Config.offset_size) + 1)})    
    })    
}

export const applyjob = (payload) => (dispatch) =>{
    var data = (payload.target.value).split('-----');    
    NotificationManager.success('Applied')          
    dispatch( { type:ACTION.DISABLE })        
    const url = Config.base_url + '/api/v1/applications'       
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${data[1]}`
        }, 
        body: JSON.stringify({'uuid' : data[0]})       
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.code === CREATED){        
        dispatch({type: ACTION.REDIRECT, payload:{}})
        dispatch( { type: ACTION.RESET })
        dispatch( { type: ACTION.ENABLE }) 
        window.location.reload(true)
      }
    })    
}

export const PostjobAction = (payload) => (dispatch) =>{      
    dispatch( { type: ACTION.DISABLE })           
    var posted = true      
    const url = Config.base_url + '/api/v1/jobs'  
    const token = JSON.parse(localStorage.getItem(F.AUTH_DATA)).token
    fetch(url,{
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(payload)        
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.code === CREATED){          
            NotificationManager.success('Posted')               
            sleepPromise(2000).then(()=>{
                dispatch( { type: ACTION.RESET })
                dispatch( { type: ACTION.ENABLE })             
                window.location.href = '/jobs/1'
            })            
        }else{
            dispatch( { type: ACTION.ERRORS, errors: data })
            dispatch( { type: ACTION.ENABLE })      
            posted = false
        }          
        if(!posted){
            NotificationManager.error('Validation Errors') 
        }      
    })                  
}


export const EditjobAction = (payload) => (dispatch) =>{     
    dispatch( { type:ACTION.DISABLE })                 
    const url = Config.base_url + '/api/v1/jobs'  
    const token = JSON.parse(localStorage.getItem(F.AUTH_DATA)).token
    fetch(url,{
        method: 'PATCH',
        headers: {
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(payload)        
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.code === SUCCESS){  
            NotificationManager.success('Saved')                                                 
            sleepPromise(2000).then(()=>{
                dispatch( { type: ACTION.RESET })
                dispatch( { type:ACTION.ENABLE }) 
                window.location.href = '/jobs/1'
            })                                    
        }else{
            dispatch( { type:ACTION.ERRORS, errors: data })
            dispatch( { type:ACTION.ENABLE })    
            return NotificationManager.error('Validation Errors')   
        }        
    })       
}