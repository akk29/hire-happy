import { ACTION } from '../constants/actionTypes';
import { FILLER as F } from '../utils';

var authData = JSON.parse(localStorage.getItem(F.AUTH_DATA));
var initialState = { isloading: true, disable: false };

if (authData !== null) {
  initialState['userinfo'] = authData;
}

const empty_state = {
  isloading: true,
  disable: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION.RESET:
      return empty_state;
    case ACTION.ISLOADING_JOBS:
      return {
        ...state,
        isloading: true,
      };
    case ACTION.ISLOADED_JOBS:
      return {
        ...state,
        isloading: false,
      };
    case ACTION.ALLJOBS:
      return {
        ...state,
        alljobs: action.payload,
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
