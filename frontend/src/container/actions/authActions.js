import { errorToast, successToast } from '../../main/common';
import { ACTION } from '../actionTypes';
import Config from '../../main/config';
import { AxiosInstance } from '../../service/axios';
import { FILLER as F } from '../../utils';

const sleepPromise = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export const SigninAction = (payload, user) => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  var url = Config.base_url + '/api/v1/login';
  if (user === F.ADMIN_ROLE) {
    url = Config.base_url + '/api/v1/admin/login';
  }
  AxiosInstance.post(url, payload)
    .then(response => {
      dispatch({ type: ACTION.ISLOADING_JOBS });
      localStorage.setItem(F.AUTH_DATA, JSON.stringify(response.data.data));
      dispatch({ type: ACTION.ERRORS, errors: undefined });
      dispatch({ type: ACTION.LOGIN, payload: response.data.data });
      dispatch({ type: ACTION.ENABLE });
      window.location.href = '/jobs/1';
    }).catch(err => {
      dispatch({ type: ACTION.ENABLE });
      dispatch({ type: ACTION.ERRORS, errors: err.response.data.errors });
      errorToast('Error');
    })
};

export const SignupAction = payload => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + '/api/v1/signup';
  AxiosInstance.post(url, payload)
    .then(response => {
      dispatch({ type: ACTION.ISLOADING_JOBS });
      localStorage.setItem(F.AUTH_DATA, JSON.stringify(response.data.data));
      dispatch({ type: ACTION.ERRORS, errors: undefined });
      dispatch({ type: ACTION.REGISTER, payload: response.data.data });
      dispatch({ type: ACTION.ENABLE });
      window.location.reload(true);
    }).catch(err => {
      dispatch({ type: ACTION.ERRORS, errors: err.response.data.errors });
      dispatch({ type: ACTION.ENABLE });
      errorToast('Error');
    })
};

export const ForgotAction = payload => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + '/api/v1/forgot';
  AxiosInstance.post(url, payload)
    .then(response => {
      successToast('Email Sent');
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
    }).catch(err => {
      dispatch({ type: ACTION.ERRORS, errors: err.response.data.errors });
      dispatch({ type: ACTION.ENABLE });
      errorToast('Error');
    })
};

export const VerifyTokenAction = payload => dispatch => {
  dispatch({ type: ACTION.ISLOADING });
  const url =
    Config.base_url + `/api/v1/verify/${payload.uuid64}/${payload.token}`;
  AxiosInstance.get(url)
    .then(response => {
      localStorage.setItem(F.RESET_DATA, response.data.data.token);
      dispatch({ type: ACTION.ERRORS, errors: undefined });
      dispatch({ type: ACTION.FORGOT, payload: response.data });
      dispatch({ type: ACTION.LOADED });
    }).catch(err => {
      dispatch({ type: ACTION.ERRORS, errors: err.response.data.errors });
      dispatch({ type: ACTION.ENABLE });
      dispatch({ type: ACTION.LOADED });
      errorToast('Error');
    })
};

export const logoutAction = payload => dispatch => {
  localStorage.clear();
  dispatch({ type: ACTION.RESET, payload: {} });
};

export const ChangePasswordAction = payload => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + `/api/v1/change-password`;
  const token = localStorage.getItem(F.RESET_DATA);
  AxiosInstance.post(url, payload, {
    headers: {
      [F.CONTENT_TYPE]: F.APPLICATION_JSON,
      [F.AUTHORIZATION]: `${F.BEARER} ${token}`,
    },
  })
    .then(response => {
      localStorage.clear();
      successToast('Your Password Has been Changed');
      sleepPromise(2000)
        .then(() => {
          dispatch({ type: ACTION.PASSWORD_ERRORS, errors: undefined });
          dispatch({ type: ACTION.CHANGEPASSWORD, payload: response.data.data });
          dispatch({ type: ACTION.REDIRECT, payload: {} });
          dispatch({ type: ACTION.ENABLE });
        })
        .catch(() => {
          dispatch({ type: ACTION.PASSWORD_ERRORS, errors: undefined });
          dispatch({ type: ACTION.CHANGEPASSWORD, payload: response.data.data });
          dispatch({ type: ACTION.REDIRECT, payload: {} });
          dispatch({ type: ACTION.ENABLE });
        });
    }).catch(err => {
      dispatch({ type: ACTION.PASSWORD_ERRORS, errors: err.response.data.errors });
      dispatch({ type: ACTION.ENABLE });
      errorToast('Error');
    })
};

export const startStopLoader = payload => dispatch => {
  dispatch({ type: ACTION.ISLOADING });
  dispatch({ type: ACTION.LOADED });
};