import React, { useState, useEffect } from 'react'
import '../../App.scss'
import './JobsList.scss'
import { Link } from 'react-router-dom'
import { convertToLink } from '../../helpers/helpers'
import { Job } from '../../interfaces/job'
import { store } from '../../store/store'

interface FiltersType {
    active: boolean,
    name: string,
}

const JobsList = (props: {jobs: any[]}) => {
    const [jobSearch, setJobSearch] = useState('')
    const [jobLocation, setJobLocation] = useState('')
    const [jobRemote, setJobRemote] = useState<FiltersType>({active: false, name: ''})
    const [jobPartTime, setJobPartTime] = useState<FiltersType>({active: false, name: ''})
    const [jobFullTime, setJobFullTime] = useState<FiltersType>({active: false, name: ''})
    const [currentResults, setCurrentResults] = useState('')
    const [filteredJobsPerPage, setFilteredJobsPerPage] = useState(Array()) // instead of useState([])
    const [currentPage, setCurrentPage] = useState()
    let filteredJobs: Array<Job> = []

    store.subscribe(() => {
        setJobSearch(store.getState().jobSearchReducer.searchedJobPosition)
        setJobLocation(store.getState().jobSearchReducer.searchedJobLocation)
        setCurrentResults(store.getState().jobSearchReducer.totalJobs)
        setJobRemote(store.getState().jobSearchReducer.checkboxRemote)
        setJobFullTime(store.getState().jobSearchReducer.checkboxFullTime)
        setJobPartTime(store.getState().jobSearchReducer.checkboxPartTime)
        setCurrentPage(store.getState().jobSearchReducer.currentPage)
    })

    const checkboxFilterCopy = (jobFullTime: boolean, jobPartTime: boolean, jobRemote: boolean, job: any) => {

    }

    const checkboxFilter = (jobFullTime: FiltersType, jobPartTime: FiltersType, jobRemote: FiltersType, value: any) => {
        const jobType = value.type.toLocaleUpperCase();
        const filteredJobsName = [
            jobFullTime.name.toLocaleUpperCase(),
            jobPartTime.name.toLocaleUpperCase(),
            jobRemote.name.toLocaleUpperCase()
        ]
        const filteredJobsActive = [
            jobFullTime.active,
            jobPartTime.active,
            jobRemote.active
        ]

        if(filteredJobsActive[0] && !filteredJobsActive[1]) {
            if (jobType.includes(filteredJobsName[0])) {
                filteredJobs.push(value)
            }
            setFilteredJobsPerPage(filteredJobs.slice(1, 10))
        } else if(!filteredJobsActive[0] && filteredJobsActive[1]) {
            if(jobType.includes(filteredJobsName[1])) {
                filteredJobs.push(value)
            }
            setFilteredJobsPerPage(filteredJobs.slice(1, 10))
        } else if(filteredJobsActive[0] && filteredJobsActive[1]) {
            if(jobType.includes(filteredJobsName[0]) || jobType.includes(filteredJobsName[1])) {
                filteredJobs.push(value)
            }
            setFilteredJobsPerPage(filteredJobs.slice(1, 10))
        } else if(filteredJobsActive[2] && !filteredJobsActive[0] && !filteredJobsActive[1]) {
            if(value.location.toLocaleUpperCase().includes(filteredJobsName[2])) {
                filteredJobs.push(value)
            }
            setFilteredJobsPerPage(filteredJobs.slice(1, 10))
        } else {
            filteredJobs.push(value)
            setFilteredJobsPerPage(filteredJobs.slice(1, 10))
        }

        // filteredJobsActive.map((filter: any, id: number) => {
        //     console.log(filter)
        //     if (filter) {
        //         if (jobType.includes(filteredJobsName[id])) {
        //             filteredJobs.push(value)
        //         }
        //         setFilteredJobsPerPage(filteredJobs.slice(1, 10))
        //     }
        // })
    }
    useEffect(() => {
        if(jobSearch !== '' && jobLocation === '') {
            props.jobs.filter((value: any) => {
               if (value.title.toLocaleUpperCase().includes(jobSearch.toLocaleUpperCase())) {
                   checkboxFilter(jobFullTime, jobPartTime, jobRemote, value)
                }
            })
            setFilteredJobsPerPage(filteredJobs)
        } else if (jobSearch === '' && jobLocation !== '') {
            props.jobs.filter((value: any) => {
                if (value.location.toLocaleUpperCase().includes(jobLocation.toLocaleUpperCase())) {
                    checkboxFilter(jobFullTime, jobPartTime, jobRemote, value)
                }
            })
            setFilteredJobsPerPage(filteredJobs)
        } else if (jobSearch !== '' && jobLocation !== '') {
            props.jobs.filter((value: any) => {
                if (value.title.toLocaleUpperCase().includes(jobSearch.toLocaleUpperCase())
                    && value.location.toLocaleUpperCase().includes(jobLocation.toLocaleUpperCase())) {
                    checkboxFilter(jobFullTime, jobPartTime, jobRemote, value)
                }
            })
           setFilteredJobsPerPage(filteredJobs)
       } else if (jobSearch === '' && jobLocation === '' && jobRemote.active || jobFullTime.active || jobPartTime.active) {
            props.jobs.filter((value: any) => {
                checkboxFilter(jobFullTime, jobPartTime, jobRemote, value)
            })
        } else if(jobRemote.active || jobFullTime.active || jobPartTime.active) {

                props.jobs.filter((value: any) => {
                    checkboxFilter(jobFullTime, jobPartTime, jobRemote, value)
                })
        } else {
            setFilteredJobsPerPage(props.jobs.slice(1, 10))
        }
        store.dispatch({ type: 'UPDATE_TOTAL_JOBS_NUMBER', number: filteredJobs.length })
    }, [jobSearch, jobLocation, jobRemote, jobFullTime, jobPartTime]);

    return (
        <div className="job-app__container l-container">
            <h4 className="center">We have found {currentResults} star jobs for your</h4>
            <ul className="job-app__list">
                {filteredJobsPerPage.map((job: Job, id) => (
                    <li className="job-app__item" key={job.id}>
                        <Link to={"/" + convertToLink(job.title)}>
                            <h3 className="job-app__item__title">{job.title}</h3>
                            <div className="job-app__item__content">
                                <div className="job-app__item__details">
                                    <h4><span className="icon icon-light-saber"/><span>{job.company}</span></h4>
                                    <p><span className="icon icon-planet"/><span>{job.location}</span></p>
                                    <p><span className="icon icon-darth-vader"/><span>{job.type}</span></p>
                                </div>
                                <div className="job-app__item__desc" dangerouslySetInnerHTML={{ __html: job.description }}/>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default JobsList
