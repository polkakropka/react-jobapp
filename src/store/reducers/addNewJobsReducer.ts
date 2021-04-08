import { newJobs } from './initialStore'

export const addedNewJobsReducer = (state = newJobs, action: any) => {
    switch (action.type) {
        case 'UPDATE_ADDED_NEW_JOBS':
            return { ...state, newJob: [action.object] }
        default:
            return state
    }

}
