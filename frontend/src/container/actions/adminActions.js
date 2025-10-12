import { ACTION } from '../actionTypes';
import Config from '../../main/config';
import { FILLER as F } from '../../utils';
import { GET_ALL_USERS_ADMIN, LIMIT_OFFSET } from '../../utils/backend';

export const getallUsers = (offset, limit, token) => dispatch => {
  dispatch({ type: ACTION.ISLOADING_USERS });
  const url = Config.base_url + `${GET_ALL_USERS_ADMIN}${LIMIT_OFFSET(limit,offset)}`;
  fetch(url, {
    method: F.GET,
    headers: {
      [F.AUTHORIZATION]: `${F.BEARER} ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      dispatch({ type: ACTION.ALLUSERS, payload: data });
      dispatch({ type: ACTION.ISLOADED_USERS });
      dispatch({
        type: ACTION.CURRENT,
        payload: offset / parseInt(Config.limit_size) + 1,
      });
    });
};

export const stopNotification = () => dispatch => {
  dispatch({ type: ACTION.STOPNOTIFY });
};
