import React, { useState, useEffect } from 'react'
import './JobSearch.scss'
import { store } from '../../store/store'
import { Link } from 'react-router-dom'

enum EmploymentTypes {
    FullTime = 'Full Time',
    PartTime = 'Part Time',
    Remote = 'Remote'
}
const filtersCheckboxContent = [
    {
        'key': 'checkbox-1',
        'label': EmploymentTypes.FullTime,
        'name' : 'fullTime',
        'action': 'UPDATE_SEARCHED_JOB_FULL_TIME'
    },
    {
        'key': 'checkbox-2',
        'label': EmploymentTypes.PartTime,
        'name' : 'partTime',
        'action': 'UPDATE_SEARCHED_JOB_PART_TIME'
    },
    {
        'key': 'checkbox-3',
        'label': EmploymentTypes.Remote,
        'name' : 'remote',
        'action': 'UPDATE_SEARCHED_JOB_REMOTE'
    }
]
const JobSearch: React.FC = () => {
    const [jobSearch, setJobSearch] = useState<string>('')
    const [jobLocation, setJobLocation] = useState<string>('')
    const getSearchValues = () => {
        store.dispatch({ type: 'UPDATE_SEARCHED_JOB_POSITION', name: jobSearch})
        store.dispatch({ type: 'UPDATE_SEARCHED_JOB_LOCATION', name: jobLocation})
    }

    const handleCheckboxChange = (event: any) => {
        const target = event.target;
        store.dispatch({ type: target.dataset.action, boolean: {
            active: target.checked,
            name: target.dataset.label,
        }})
    }

    return (
        <div className="job-app__top l-container">
            <div className="job-app__search l-container">
                <div className="job-app__search__container">
                    <input
                        id="job-search" 
                        className="input-search"
                        type="text"
                        placeholder="Job Position"
                        onChange={(e) => setJobSearch(e.target.value)}
                    />
                    <input
                        className="input-location"
                        type="text"
                        placeholder="Planet"
                        onChange={(e) => setJobLocation(e.target.value)}
                    />
                    <input type="submit" id="submitButton" className="btn btn--primary" value="Search" onClick={getSearchValues}/>
                    <ul className="job-app__search__filter">
                        {filtersCheckboxContent.map((filter: any | object) => (
                            <li className="job-app__search__filter__item" key={filter.key}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={filter.name}
                                        onChange={handleCheckboxChange}
                                        data-action={filter.action}
                                        data-label={filter.label}
                                    />
                                    {filter.label as string}
                                    <span className="checkmark"/>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Link to="/add-job-offer" className="btn btn--secondary">Add New Job</Link>
        </div>
    )
}

export default JobSearch