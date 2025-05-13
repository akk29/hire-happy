import { ACTION } from "../constants/actionTypes";
import Config from "../main/config";
import { FILLER as F } from "../utils";

export const getallUsers = (limit,offset , token) => (dispatch) =>{   
    dispatch( { type:ACTION.ISLOADING_USERS })    
    const url = Config.base_url + `/api/v1/admin/users?limit=${limit}&offset=${offset}`              
    fetch(url,{
        method: F.GET,
        headers: {
            [F.AUTHORIZATION]: `Bearer ${token}`
        },        
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type:ACTION.ALLUSERS, payload:data })        
      dispatch({ type:ACTION.ISLOADED_USERS })
      dispatch({ type:ACTION.CURRENT , payload : (offset/parseInt(Config.offset_size) + 1)})    
    })        
}

export const stopNotification = () => dispatch => {
    dispatch( { type:ACTION.STOPNOTIFY })
}