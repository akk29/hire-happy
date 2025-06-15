import { ACTION } from '../actionTypes';
import Config from '../../main/config';
import { FILLER as F } from '../../utils';
import { errorToast, successToast } from '../../main/common';
import { axiosAuthenticated } from '../../service/axios';

const sleepPromise = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export const GetJobsAction = (offset, limit) => dispatch => {
  dispatch({ type: ACTION.ISLOADING_JOBS });
  var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role;
  var hit_url = '';
  if (role === F.SUPER_USER_ROLE) {
    hit_url = `/api/v1/admin/jobs?limit=${limit}&offset=${offset}`;
  } else {
    hit_url = `/api/v1/jobs?limit=${limit}&offset=${offset}`;
  }
  const url = Config.base_url + hit_url;
  axiosAuthenticated.get(url).then((response) => {
    dispatch({ type: ACTION.ALLJOBS, payload: response.data });
    dispatch({ type: ACTION.ISLOADED_JOBS });
    dispatch({
      type: ACTION.CURRENT,
      payload: offset / parseInt(Config.limit_size) + 1,
    });
  }).catch((error) => {
    errorToast('Error fetching jobs');
  })
};

export const ApplyJobAction = payload => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + '/api/v1/applications';
  axiosAuthenticated.post(url, {
    uuid: payload.target.value,
  })
    .then(response => {
      successToast('Applied');
      sleepPromise(2000)
        .then(() => {
          dispatch({ type: ACTION.REDIRECT, payload: {} });
          dispatch({ type: ACTION.RESET });
          dispatch({ type: ACTION.ENABLE });
          window.location.reload(true);
        })
        .catch(() => {
          dispatch({ type: ACTION.REDIRECT, payload: {} });
          dispatch({ type: ACTION.RESET });
          dispatch({ type: ACTION.ENABLE });
          window.location.reload(true);
        });
    })
    .catch(err => {
      errorToast('Error applying for job');
      sleepPromise(1000).then(() => {
        dispatch({ type: ACTION.ENABLE });
      }).catch(() => {
        dispatch({ type: ACTION.ENABLE });
      });
    });
};

export const PostJobAction = payload => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + '/api/v1/jobs';
  axiosAuthenticated.post(url, payload)
    .then(response => {
      successToast('Job Created');
      sleepPromise(2000).then(() => {
        dispatch({ type: ACTION.RESET });
        dispatch({ type: ACTION.ENABLE });
        window.location.href = '/jobs/1';
      });
    }).catch(err => {
      errorToast('Error creating Job');
      sleepPromise(500).then(() => {
        dispatch({ type: ACTION.ERRORS, errors: err.response.data.errors });
        dispatch({ type: ACTION.ENABLE });
      });
    })
};

export const EditJobAction = payload => dispatch => {
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + '/api/v1/jobs';
  axiosAuthenticated.patch(url, payload).then(response => {
    if (response.data.code === F.SUCCESS) {
      successToast('Job Updated');
      sleepPromise(2000).then(() => {
        dispatch({ type: ACTION.RESET });
        dispatch({ type: ACTION.ENABLE });
        window.location.href = '/jobs/1';
      });
    } else {
      dispatch({ type: ACTION.ERRORS, errors: response.data });
      dispatch({ type: ACTION.ENABLE });
      errorToast(F.VALIDATION_ERRORS);
    }
  }).catch(err => {
    console.error(err);
    errorToast('Error updating Job');
    sleepPromise(500).then(() => {
      dispatch({ type: ACTION.ERRORS, errors: err.response.data.errors });
      dispatch({ type: ACTION.ENABLE });
    });
  });
};
