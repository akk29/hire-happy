import {  ACTION } from "../constants/actionTypes"
import Config from "../main/config"
import { FILLER as F } from "../utils"

export const SigninAction = (payload,user) => (dispatch) =>{       
      dispatch( { type:ACTION.DISABLE })                         
      var url = Config.base_url  + '/api/v1/login'            
      if(user === F.ADMIN_ROLE){
        url = Config.base_url + '/api/v1/admin/login'    
      }
      fetch(url,{
          method: F.POST,
          headers: {
             [F.CONTENT_TYPE] : F.APPLICATION_JSON,
          },
          body: JSON.stringify(payload)
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.code === F.SUCCESS){          
          window.location.href = '/jobs/1'
          dispatch( { type:ACTION.ISLOADING_JOBS})       
          localStorage.setItem(F.AUTH_DATA,JSON.stringify(data.data))          
          dispatch( { type:ACTION.ERRORS, errors: undefined })
          dispatch( { type:ACTION.LOGIN, payload:data })  
          dispatch( { type:ACTION.ENABLE })              
        }else{
          dispatch( { type:ACTION.ENABLE })
          dispatch( { type:ACTION.ERRORS, errors:data })          
        }        
      })       
}


export const SignupAction = (payload) => (dispatch) =>{          
  dispatch( { type:ACTION.DISABLE })
  const url = Config.base_url  + '/api/v1/signup'            
  fetch(url,{
      method: F.POST,
      headers: {
          [F.CONTENT_TYPE] : F.APPLICATION_JSON,
      },
      body: JSON.stringify(payload)
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.code === F.SUCCESS){
      window.location.reload(true)
      dispatch( { type:ACTION.ISLOADING_JOBS})
      localStorage.setItem(F.AUTH_DATA,JSON.stringify(data.data))
      dispatch( { type:ACTION.ERRORS, errors: undefined })
      dispatch( { type:ACTION.REGISTER, payload:data })
      dispatch( { type:ACTION.ENABLE })              
    }else{      
      dispatch( { type:ACTION.ERRORS, errors:data })
      dispatch( { type:ACTION.ENABLE })      
    }
  })     
}


export const ForgotAction = (payload) => (dispatch) =>{     
  dispatch( { type:ACTION.DISABLE })
  const url = Config.base_url  + '/api/v1/forgot'            
  fetch(url,{
      method: F.POST,
      headers: {
          [F.CONTENT_TYPE] : F.APPLICATION_JSON,
      },
      body: JSON.stringify(payload)
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.code === F.SUCCESS){
      dispatch( { type:ACTION.ERRORS, errors: undefined })
      dispatch( { type:ACTION.FORGOT, payload:data })
      alert('Email Sent')
      window.location.reload(true);
    }else{
      dispatch( { type:ACTION.ERRORS, errors:data })
      dispatch( { type:ACTION.ENABLE })
    }
  })    
}

export const VerifyTokenAction = (payload) => (dispatch) =>{
  dispatch( { type:ACTION.ISLOADING})
  const url = Config.base_url  + `/api/v1/verify/${payload.uuid64}/${payload.token}`            
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if(data.code === F.SUCCESS){           
      localStorage.setItem(F.AUTH_DATA,data.data.token)     
      dispatch( { type:ACTION.ERRORS, errors: undefined })
      dispatch( { type:ACTION.FORGOT, payload:data })      
      dispatch({ type:ACTION.LOADED })
    }else{
      dispatch( { type:ACTION.ERRORS, errors:data })
      dispatch({ type:ACTION.LOADED })
    }
  })
}


export const logoutAction = (payload) =>(dispatch) =>{
  localStorage.clear()
  dispatch( { type:ACTION.RESET, payload: {} })          
}

export const changePassword = (payload) => (dispatch) =>{
    dispatch( { type:ACTION.DISABLE })
    const url = Config.base_url + `/api/v1/change-password`  
    const token = localStorage.getItem(F.AUTH_DATA)     
    fetch(url,{
        method: F.POST,
        headers: {
            [F.CONTENT_TYPE]: F.APPLICATION_JSON,
            [F.AUTHORIZATION] : `Bearer ${token}`
        }, 
        body: JSON.stringify(payload)       
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.code === F.SUCCESS){      
        localStorage.clear()
        dispatch( { type:ACTION.PASSWORD_ERRORS, errors: undefined })
        dispatch( { type:ACTION.CHANGEPASSWORD, payload:data })     
        dispatch( { type:ACTION.REDIRECT, payload:{}})      
        alert('Your Password Has been Changed')
        dispatch( { type:ACTION.ENABLE })
      }else{
        dispatch( { type:ACTION.PASSWORD_ERRORS, errors: data })
        dispatch( { type:ACTION.ENABLE })
      }
    })  
}


export const startStopLoader = (payload) => (dispatch) =>{
  dispatch( { type:ACTION.ISLOADING});  
  dispatch({ type:ACTION.LOADED })
}
