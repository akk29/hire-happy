import { combineReducers } from 'redux';
import authReducer from './auth';
import jobsReducer from './jobs';
import adminReducer from './admin';
import applicationsReducer from './applications';
import { ACTION } from '../constants/actionTypes';

const appReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  admin: adminReducer,
  applications: applicationsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ACTION.RESET) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
