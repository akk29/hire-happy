import { ACTION } from '../actionTypes';
import { FILLER as F } from '../../utils';

var initialState = { isloading: true, disable: false };
var payload = JSON.parse(localStorage.getItem(F.AUTH_DATA));

if (payload !== null) {
  initialState['userinfo'] = payload;
}

const empty_state = {
  isloading: true,
  disable: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION.ISLOADING:
      return {
        ...state,
        isloading: true,
      };
    case ACTION.LOADED:
      return {
        ...state,
        isloading: false,
      };
    case ACTION.RESET:
      return empty_state;
    case ACTION.LOGIN:
      return {
        ...state,
        userinfo: action.payload,
      };
    case ACTION.REGISTER:
      return {
        ...state,
        userinfo: action.payload,
      };
    case ACTION.FORGOT:
      return {
        ...state,
        userinfo: action.payload,
      };
    case ACTION.ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case ACTION.PASSWORD_ERRORS:
      return {
        ...state,
        error_password: action.errors,
      };
    case ACTION.CHANGEPASSWORD:
      return {
        ...state,
        data: action.payload,
      };
    case ACTION.REDIRECT:
      return {
        ...state,
        redirect: true,
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
    default:
      return state;
  }
};
