import {ACTION } from "../constants/actionTypes"
import Config from "../main/config"
import { FILLER as F, SUPER_USER_ROLE } from "../utils"

export const getallapplications = (limit,offset,token) => (dispatch) =>{    
    dispatch( { type:ACTION.ISLOADING_APPLICATIONS})
    var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role
    var hit_url = ''
    if(role === SUPER_USER_ROLE){
        hit_url = `/api/v1/admin/applications?limit=${limit}&offset=${offset}`
    }else{
        hit_url = `/api/v1/applications?limit=${limit}&offset=${offset}`
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
      dispatch({ type:ACTION.ALLAPPLICATIONS, payload:data })              
      dispatch({ type:ACTION.LOADED_APPLICATIONS })
      dispatch({ type:ACTION.CURRENT , payload : (offset/parseInt(Config.offset_size) + 1)})    
    })
        
}