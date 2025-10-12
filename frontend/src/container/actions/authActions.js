import { errorToast, successToast } from '../../main/common';
import { ACTION } from '../actionTypes';
import Config from '../../main/config';
import { AxiosInstance } from '../../service/axios';
import { FILLER as F } from '../../utils';
import {
  ADMIN_LOGIN,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  USER_LOGIN,
  USER_SIGNUP,
  VERYIFY_PASSWORD,
} from '../../utils/backend';

const sleepPromise = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export const SigninAction = (payload, user) => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  var url = Config.base_url + USER_LOGIN;
  if (user === F.ADMIN_ROLE) {
    url = Config.base_url + ADMIN_LOGIN;
  }
  AxiosInstance.post(url, payload)
    .then(response => {
      dispatch({ type: ACTION.ISLOADING_JOBS });
      localStorage.setItem(F.AUTH_DATA, JSON.stringify(response.data.data));
      dispatch({ type: ACTION.ERRORS, errors: undefined });
      dispatch({ type: ACTION.LOGIN, payload: response.data.data });
      dispatch({ type: ACTION.ENABLE });
      window.location.href = F.JOB_ONE;
    })
    .catch(err => {
      dispatch({ type: ACTION.ENABLE });
      dispatch({ type: ACTION.ERRORS, errors: err.response.data.errors });
      errorToast(F.ERROR);
    });
};

export const SignupAction = payload => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + USER_SIGNUP;
  AxiosInstance.post(url, payload)
    .then(response => {
      dispatch({ type: ACTION.ISLOADING_JOBS });
      localStorage.setItem(F.AUTH_DATA, JSON.stringify(response.data.data));
      dispatch({ type: ACTION.ERRORS, errors: undefined });
      dispatch({ type: ACTION.REGISTER, payload: response.data.data });
      dispatch({ type: ACTION.ENABLE });
      window.location.reload(true);
    })
    .catch(err => {
      dispatch({ type: ACTION.ERRORS, errors: err.response.data.errors });
      dispatch({ type: ACTION.ENABLE });
      errorToast(F.ERROR);
    });
};

export const ForgotAction = payload => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + FORGOT_PASSWORD;
  AxiosInstance.post(url, payload)
    .then(response => {
      successToast(F.EMAIL_SENT);
      sleepPromise(2000)
        .then(() => {
          dispatch({ type: ACTION.ERRORS, errors: undefined });
          dispatch({ type: ACTION.FORGOT, payload: response.data.data });
          dispatch({ type: ACTION.ENABLE });
        })
        .catch(() => {
          dispatch({ type: ACTION.ERRORS, errors: undefined });
          dispatch({ type: ACTION.FORGOT, payload: response.data.data });
          dispatch({ type: ACTION.ENABLE });
        });
    })
    .catch(err => {
      dispatch({ type: ACTION.ERRORS, errors: err.response.data.errors });
      dispatch({ type: ACTION.ENABLE });
      errorToast(F.ERROR);
    });
};

export const VerifyTokenAction = payload => dispatch => {
  dispatch({ type: ACTION.ISLOADING });
  const url =
    Config.base_url + `${VERYIFY_PASSWORD}/${payload.uuid64}/${payload.token}`;
  AxiosInstance.get(url)
    .then(response => {
      localStorage.setItem(F.RESET_DATA, response.data.data.token);
      dispatch({ type: ACTION.ERRORS, errors: undefined });
      dispatch({ type: ACTION.FORGOT, payload: response.data });
      dispatch({ type: ACTION.LOADED });
    })
    .catch(err => {
      dispatch({ type: ACTION.ERRORS, errors: err.response.data.errors });
      dispatch({ type: ACTION.ENABLE });
      dispatch({ type: ACTION.LOADED });
      errorToast(F.ERROR);
    });
};

export const logoutAction = payload => dispatch => {
  localStorage.clear();
  dispatch({ type: ACTION.RESET, payload: {} });
};

export const ChangePasswordAction = payload => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + CHANGE_PASSWORD;
  const token = localStorage.getItem(F.RESET_DATA);
  AxiosInstance.post(url, payload, {
    headers: {
      [F.CONTENT_TYPE]: F.APPLICATION_JSON,
      [F.AUTHORIZATION]: `${F.BEARER} ${token}`,
    },
  })
    .then(response => {
      localStorage.clear();
      successToast(F.PASSWORD_CHANGED_SUCCESS);
      sleepPromise(2000)
        .then(() => {
          dispatch({ type: ACTION.PASSWORD_ERRORS, errors: undefined });
          dispatch({
            type: ACTION.CHANGEPASSWORD,
            payload: response.data.data,
          });
          dispatch({ type: ACTION.REDIRECT, payload: {} });
          dispatch({ type: ACTION.ENABLE });
        })
        .catch(() => {
          dispatch({ type: ACTION.PASSWORD_ERRORS, errors: undefined });
          dispatch({
            type: ACTION.CHANGEPASSWORD,
            payload: response.data.data,
          });
          dispatch({ type: ACTION.REDIRECT, payload: {} });
          dispatch({ type: ACTION.ENABLE });
        });
    })
    .catch(err => {
      dispatch({
        type: ACTION.PASSWORD_ERRORS,
        errors: err.response.data.errors,
      });
      dispatch({ type: ACTION.ENABLE });
      errorToast(F.ERROR);
    });
};

export const startStopLoader = payload => dispatch => {
  dispatch({ type: ACTION.ISLOADING });
  dispatch({ type: ACTION.LOADED });
};
