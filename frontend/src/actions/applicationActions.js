import { ACTION } from '../constants/actionTypes';
import Config from '../main/config';
import { axiosAuthenticated } from '../service/axios';
import { FILLER as F } from '../utils';

export const GetApplicationsAction = (limit, offset) => dispatch => {
  dispatch({ type: ACTION.ISLOADING_APPLICATIONS });
  var role = JSON.parse(localStorage.getItem(F.AUTH_DATA)).role;
  var hit_url = '';
  if (role === F.SUPER_USER_ROLE) {
    hit_url = `/api/v1/admin/applications?limit=${limit}&offset=${offset}`;
  } else {
    hit_url = `/api/v1/applications?limit=${limit}&offset=${offset}`;
  }
  const url = Config.base_url + hit_url;

  axiosAuthenticated.get(url).then(response => {
    dispatch({ type: ACTION.ALLAPPLICATIONS, payload: response.data });
    dispatch({ type: ACTION.LOADED_APPLICATIONS });
    dispatch({
      type: ACTION.CURRENT,
      payload: offset / parseInt(Config.offset_size) + 1,
    });
  }).catch(error => {
    dispatch({ type: ACTION.LOADED_APPLICATIONS });
  });
};
