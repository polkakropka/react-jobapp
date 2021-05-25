import React, {useState, useEffect} from 'react'
import './App.scss'
import jobsData from './data/jobs.json'
import Header from './components/Header/Header'
import JobSearch from './components/JobSearch/JobSearch'
import JobsList from './components/JobsList/JobsList'
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
    const [activeFilter, setActiveFilter] = useState([]);
    const [jobs, setJobs] = useState([jobsData])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const updatedJobs: Array<any> = []
    updatedJobs.push(...jobs[0])

    // const baseURL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'
    //console.log(activeFilter)
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

    store.subscribe(() => {
        setCurrentPage(store.getState().jobSearchReducer.currentPage)
    })

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

                    <Route path="/" >
                        <div className="job-app__top l-container">
                            <JobSearch activeFilter={activeFilter}
                                       setActiveFilter={setActiveFilter}/>

                            {loading ? <p>Loading...</p> :
                                <JobsList
                                    jobs={jobs[0]}
                                    activeFilter={activeFilter}
                                />}
                        </div>
                    </Route>
                </Switch>
            </Router>
            <Footer/>
        </div>
    );
}

export default App
