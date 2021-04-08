export const initialStore = {
    searchedJobPosition: '',
    searchedJobLocation: '',
    totalJobs: 1,
    checkboxRemote: {
        active: false,
        name: '',
    },
    checkboxFullTime: {
        active: false,
        name: '',
    },
    checkboxPartTime: {
        active: false,
        name: '',
    },
    currentPage: 1
}
export const newJobs = {
    newJob: [
        {
            id: Date.now() * 29381724,
            title: "Example Job",
            company: "Company",
            location: "Somewhere",
            type: "Remote",
            description: "some decription"
        }
    ]
}