import { ACTION } from "../constants/actionTypes";
import { FILLER as F } from "../utils";

var initialState = { isloading: true, disable: false };
var payload  = JSON.parse(localStorage.getItem(F.AUTH_DATA))

if(payload !== null){
  initialState['userinfo'] = payload
}

const empty_state = {
  isloading: true, disable: false
}

export default (state = initialState, action) => {  
  switch (action.type) {    
    case ACTION.RESET:
      return empty_state;
    case ACTION.ISLOADING_APPLICATIONS:
      return {
        ...state,
        isloading: true,
      };
    case ACTION.LOADED_APPLICATIONS:
      return {
        ...state,
        isloading: false,
      };
    case ACTION.ALLAPPLICATIONS:
      return {
        ...state,
        allapplications: action.payload,
      };
    case ACTION.REDIRECT:
      return {
        ...state,
        redirect: true,
      };
    case ACTION.ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case ACTION.EDIT_REDIRECT:
      return {
        ...state,
        redirect: action.payload,
      };
    case ACTION.DISABLE:
      return {
        ...state,
        disable: true,
      };
    case ACTION.ENABLE:
      return {
        ...state,
        disable: false,
      };
    case ACTION.CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};
