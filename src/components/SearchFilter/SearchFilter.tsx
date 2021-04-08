import React, {createRef, useState} from 'react'
//import './SearchFilter.scss'
import {store} from "../../store/store";

enum EmploymentTypes {
    FullTime = 'Full Time',
    PartTime = 'Part Time',
    Remote = 'Remote'
}

const SearchFilter: React.FC = () => {

    const content = [
        {
            'key': 'checkbox-1',
            'label': EmploymentTypes.FullTime,
            'name' : 'fullTime'
        },
        {
            'key': 'checkbox-2',
            'label': EmploymentTypes.PartTime,
            'name' : 'partTime'
        },
        {
            'key': 'checkbox-3',
            'label': EmploymentTypes.Remote,
            'name' : 'remote'
        }
    ]
    const handleInputChange = (event:any) => {
        const target = event.target;
        const checkboxValue = target.type === 'checkbox' ? target.checked : target.value;
        const checkboxName = target.name;
    }

    return (
        <ul className="job-app__search__filter">
            {content.map((label: any | object) => (
                <li className="job-app__search__filter__item" key={label.key}>
                    <label>
                        <input
                            type="checkbox"
                            name={label.name as string}
                            onChange={handleInputChange}
                        />
                        {label.label as string}
                        <span className="checkmark"></span>
                    </label>
                </li>
            ))}
        </ul>
    )
}

export default SearchFilter