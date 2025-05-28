import { NotificationManager } from "react-notifications";
import { ACTION } from "../constants/actionTypes";
import Config from "../main/config";
import { FILLER as F } from "../utils";
import { errorToast, successToast } from "../common/toasts";

const sleepPromise = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const getalljobs = (offset, limit, token) => (dispatch) => {
  dispatch({ type: ACTION.ISLOADING_JOBS });
  var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role;
  var hit_url = "";
  if (role === F.SUPER_USER_ROLE) {
    hit_url = `/api/v1/admin/jobs?limit=${limit}&offset=${offset}`;
  } else {
    hit_url = `/api/v1/jobs?limit=${limit}&offset=${offset}`;
  }
  const url = Config.base_url + hit_url;
  fetch(url, {
    method: F.GET,
    headers: {
      [F.AUTHORIZATION]: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: ACTION.ALLJOBS, payload: data });
      dispatch({ type: ACTION.ISLOADED_JOBS });
      dispatch({
        type: ACTION.CURRENT,
        payload: offset / parseInt(Config.limit_size) + 1,
      });
    });
};

export const applyjob = (payload) => (dispatch) => {
  var data = payload.target.value.split("-----");
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + "/api/v1/applications";
  fetch(url, {
    method: F.POST,
    headers: {
      [F.CONTENT_TYPE]: F.APPLICATION_JSON,
      [F.AUTHORIZATION]: `Bearer ${data[1]}`,
    },
    body: JSON.stringify({ uuid: data[0] }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === F.CREATED) {
        successToast("Applied");
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
      }
    })
    .catch((err) => {
      errorToast("Error applying for job");
    });
};

export const PostjobAction = (payload) => (dispatch) => {
  dispatch({ type: ACTION.DISABLE });
  var posted = true;
  const url = Config.base_url + "/api/v1/jobs";
  const token = JSON.parse(localStorage.getItem(F.AUTH_DATA)).token;
  fetch(url, {
    method: F.POST,
    headers: {
      [F.CONTENT_TYPE]: F.APPLICATION_JSON,
      [F.AUTHORIZATION]: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === F.CREATED) {
        successToast("Job Created");
        sleepPromise(2000).then(() => {
          dispatch({ type: ACTION.RESET });
          dispatch({ type: ACTION.ENABLE });
          window.location.href = "/jobs/1";
        });
      } else {
        dispatch({ type: ACTION.ERRORS, errors: data });
        dispatch({ type: ACTION.ENABLE });
        errorToast("Error creating Job");
      }
      if (!posted) {
        NotificationManager.error(F.VALIDATION_ERRORS);
      }
    })
    .catch((err) => {
      errorToast("Error");
    })
    .catch((err) => {
      errorToast("Error");
    });
};

export const EditjobAction = (payload) => (dispatch) => {
  dispatch({ type: ACTION.DISABLE });
  const url = Config.base_url + "/api/v1/jobs";
  const token = JSON.parse(localStorage.getItem(F.AUTH_DATA)).token;
  fetch(url, {
    method: F.PATCH,
    headers: {
      [F.AUTHORIZATION]: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === F.SUCCESS) {
        successToast("Saved");
        sleepPromise(2000).then(() => {
          dispatch({ type: ACTION.RESET });
          dispatch({ type: ACTION.ENABLE });
          window.location.href = "/jobs/1";
        });
      } else {
        dispatch({ type: ACTION.ERRORS, errors: data });
        dispatch({ type: ACTION.ENABLE });
        return NotificationManager.error(F.VALIDATION_ERRORS);
      }
    })
    .catch((err) => {
      console.error(err);
      errorToast("Error");
    })
    .catch((err) => {
      console.error(err);
      errorToast("Error");
    });
};
