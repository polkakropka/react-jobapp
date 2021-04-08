import { combineReducers } from 'redux'
import { jobSearchReducer } from './jobSearchReducer'
import {addedNewJobsReducer} from "./addNewJobsReducer";

export default combineReducers({
    jobSearchReducer,
    addedNewJobsReducer
})
