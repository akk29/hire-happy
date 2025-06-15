import { ACTION } from '../actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isloading: true }, action) => {
  switch (action.type) {
    case ACTION.RESET:
      return {};
    case ACTION.ISLOADING_USERS:
      return {
        ...state,
        isloading: true,
      };
    case ACTION.ISLOADED_USERS:
      return {
        ...state,
        isloading: false,
      };
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
    case ACTION.ALLUSERS:
      return {
        ...state,
        allusers: action.payload,
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
    case ACTION.STOPNOTIFY:
      return {
        ...state,
        notify: false,
      };
    case ACTION.NOTIFY:
      return {
        ...state,
        notify: true,
      };
    default:
      return state;
  }
};
