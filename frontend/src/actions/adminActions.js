import { ACTION } from "../constants/actionTypes";
import Config from "../main/config";
import { NotificationManager } from "react-notifications";
import { FILLER as F, SUCCESS } from "../utils";

export const getallUsers = (limit,offset , token) => (dispatch) =>{   
    dispatch( { type:ACTION.ISLOADING_USERS })    
    const url = Config.base_url + `/api/v1/admin/users?limit=${limit}&offset=${offset}`              
    fetch(url,{
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },        
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type:ACTION.ALLUSERS, payload:data })        
      dispatch({ type:ACTION.ISLOADED_USERS })
      dispatch({ type:ACTION.CURRENT , payload : (offset/parseInt(Config.offset_size) + 1)})    
    })        
}

function sleepPromise (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}



export const deleteObjectById = ( objectwithid ) => (dispatch) => {
    dispatch( { type:ACTION.DISABLE })    
    NotificationManager.success('Deleted');      
    const url = Config.base_url + `/api/v1/admin/delete`    
    var authData = JSON.parse(localStorage.getItem(F.AUTH_DATA))
    const token = authData.token    
    var data = (objectwithid.target.value).split('-');
    const payload = {
        'db' : data[0],
        'id' : data[1]
    }
    fetch(url,{
        method: 'DELETE',
        headers: {
          'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify(payload)        
    })
    .then((response) => response.json())
    .then((data) => {         
        if(data.code === SUCCESS){        
            sleepPromise(2000)
            .then(()=>{
                dispatch( { type:ACTION.ISLOADING_APPLICATIONS })
                dispatch( { type:ACTION.ISLOADING_USERS })
                dispatch( { type:ACTION.ISLOADING_JOBS })
                dispatch( { type:ACTION.ENABLE })  
                window.location.reload()
            })    
            
                                  
        }                              
    })       
}

export const stopNotification = () => dispatch => {
    dispatch( { type:ACTION.STOPNOTIFY })
}