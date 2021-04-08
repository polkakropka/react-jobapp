import { initialStore } from './initialStore'

export const jobSearchReducer = (state = initialStore, action: any) => {
    switch (action.type) {
        case 'UPDATE_SEARCHED_JOB_POSITION':
            return { ...state, searchedJobPosition: action.name }
        case 'UPDATE_SEARCHED_JOB_LOCATION':
            return { ...state, searchedJobLocation: action.name }
        case 'UPDATE_SEARCHED_JOB_FULL_TIME':
            return { ...state, checkboxFullTime: action.boolean }
        case 'UPDATE_SEARCHED_JOB_PART_TIME':
            return { ...state, checkboxPartTime: action.boolean }
        case 'UPDATE_SEARCHED_JOB_REMOTE':
            return { ...state, checkboxRemote: action.boolean }
        case 'UPDATE_TOTAL_JOBS_NUMBER':
            return { ...state, totalJobs: action.number }
        case 'UPDATE_CURRENT_PAGE':
            return { ...state, currentPage: action.number }
        default:
            return state
    }

}

