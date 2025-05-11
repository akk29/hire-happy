import { combineReducers } from 'redux';
import auth from "./auth"
import jobs from './jobs'
import admin from './admin'
import applications from "./applications"
import { ACTION } from '../constants/actionTypes';

const appReducer = combineReducers({
    auth:auth,
    jobs:jobs,
    admin:admin,
    applications: applications
})

const rootReducer = (state, action) => {    
    if (action.type === ACTION.RESET) {             
        state = undefined
      }
    return appReducer(state, action)
}

export default rootReducer