import React, {useState, useEffect} from 'react'
import './App.scss'
import jobsData from './data/jobs.json'
import Header from './components/Header/Header'
import JobSearch from './components/JobSearch/JobSearch'
import JobsList from './components/JobsList/JobsList'
import Pagination from './components/Pagination/Pagination'
import Footer from './components/Footer/Footer'
import AddJob from './components/AddJob/AddJob'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import JobDetailsPage from './components/JobDetailsPage/JobDetailsPage'
import {convertToLink} from './helpers/helpers'
import { Job } from './interfaces/job'
import { store } from './store/store'

const App: React.FC = () => {
    const [jobs, setJobs] = useState([jobsData])
    const [loading, setLoading] = useState(false)

    const [isCurrent, setCurrentState] = useState(false)
    const updatedJobs: Array<any> = []
    updatedJobs.push(...jobs[0])

    // const baseURL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'

    useEffect(() => {
        const fetchPosts = async() => {
            setLoading(true)
            // const response = await axios.get(baseURL)
            // setJobs(response.data);
            setLoading(false)
        }
        fetchPosts()
        // dispatch -> totalJobsNumber
        store.dispatch({ type: 'UPDATE_TOTAL_JOBS_NUMBER', number: updatedJobs.length })

        updatedJobs.unshift(store.getState().addedNewJobsReducer.newJob[0])
    }, [jobs, updatedJobs])

    // const indexOfLastJob = currentPage * jobsPerPage
    // const indexOfFirstJob = indexOfLastJob - jobsPerPage
    // const currentJobs = jobs[0].slice(indexOfFirstJob, indexOfLastJob)


    return (
        <div className="job-app">
            <Router>
                <Header/>
                <Switch>
                    {updatedJobs.map((job, id) => {
                        return <Route key={id} path={"/" + convertToLink(job.title)}>
                            <JobDetailsPage detail={job as Job} />
                        </Route>
                    })}

                    <Route path={"/add-job-offer"}>
                        <AddJob/>
                    </Route>

                    <Route path="/">
                        <div className="job-app__top l-container">
                            <JobSearch/>

                            {loading ? <p>Loading...</p> :
                                <JobsList jobs={jobs[0]}/>}
                        </div>
                        <Pagination/>
                    </Route>
                </Switch>
            </Router>
            <Footer/>
        </div>
    );
}

export default App
