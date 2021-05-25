import React, {useState, useMemo, useEffect} from 'react'
import '../../App.scss'
import './JobsList.scss'
import {Link, Route} from 'react-router-dom'
import { convertToLink } from '../../helpers/helpers'
import { Job } from '../../interfaces/job'
import { store } from '../../store/store'
import Pagination from "../Pagination/Pagination";

interface FiltersType {
    active: boolean,
    name: string,
}

const JobsList = (props: {activeFilter:any, jobs: any[]}) => {
    const { activeFilter } = props;
    const [jobSearch, setJobSearch] = useState('')
    const [jobLocation, setJobLocation] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [jobPerPage, setJobPerPage] = useState(10);
    //let filteredJobs: Array<Job> = []
    store.subscribe(() => {
        setJobSearch(store.getState().jobSearchReducer.searchedJobPosition)
        setJobLocation(store.getState().jobSearchReducer.searchedJobLocation)
        setCurrentPage(store.getState().jobSearchReducer.currentPage)
    })
    const filteredJobs = useMemo(() => {
        const hasCategoryFilter = Object.values(activeFilter).includes(true);
        const matchesCategories = (job:Job) => {
            const jobTypes = [];
            jobTypes.push(job.type, job.location)

            if (hasCategoryFilter) {
                return jobTypes.some(
                    (type:string) => {
                        return activeFilter[type] === true
                    }
                )
            } else return true;
        }
        const matchesJobs = (job: Job) => {
            if(jobSearch && !jobLocation) return job.title.toLowerCase().includes(jobSearch.toLowerCase())
            if(jobLocation && !jobSearch) return job.location.toLowerCase().includes(jobLocation.toLowerCase())
            if(jobSearch && jobLocation) return job.title.toLowerCase().includes(jobSearch.toLowerCase())
                && job.location.toLowerCase().includes(jobLocation.toLowerCase())
            else {return props.jobs}
        }
        return props.jobs
            .filter(matchesJobs)
            .filter(matchesCategories);
    }, [props.jobs, jobSearch, jobLocation, activeFilter])

    //pagination
    const currentJobs = filteredJobs.slice(
        (currentPage - 1) * jobPerPage,
        currentPage * jobPerPage
    );
    const pages = Math.ceil(filteredJobs.length / jobPerPage);

    useEffect(() => {
        if (currentPage > pages) {
            setCurrentPage(1);
        }
    }, [currentPage, pages]);

    const pageNumbers = Array(pages)
        .fill(null)
        .map((val, index) => index + 1);

    const handleClick = (page:number) => {
        setCurrentPage(page);
    };

    return (
        <div className="job-app__container">
            <h4 className="center">We have found {filteredJobs.length} star jobs for your</h4>
            <ul className="job-app__list">
                {currentJobs.map((job: Job, id) => (
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
            <Pagination
                pageNumbers={pageNumbers}
                handleClick={handleClick}
                currentPage={currentPage}
            />
        </div>
    )
}

export default JobsList
