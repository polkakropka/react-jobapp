import React, {useEffect, createRef, Ref} from 'react'
import './AddJob.scss'
import {convertToLink} from "../../helpers/helpers";
import {Link} from "react-router-dom";
import {store} from "../../store/store";
import {newJobs} from "../../store/reducers/initialStore";

const AddJob: React.FC = () => {
    useEffect( () => {

    })
    const titleRef = createRef<any>()
    const companyRef = createRef<any>()
    const locationRef = createRef<any>()
    const typeRef = createRef<any>()
    const descriptionRef = createRef<any>()

    const addNewJobOffer = (event:any) => {
        event.preventDefault()
       const job = {
           id: Date.now() * 123456,
           title: titleRef.current.value,
           company: companyRef.current.value,
           location: locationRef.current.value,
           type: typeRef.current.value,
           description: descriptionRef.current.value
       }
        store.dispatch({ type: 'UPDATE_ADDED_NEW_JOBS',  object: job })
    }
    return (
            <div className="job-app__form l-container">
                <form onSubmit={addNewJobOffer}>
                    <input name="title" ref={titleRef} type="text" className="input-100" placeholder="Job Position"/>
                    <input name="company"  ref={companyRef} type="text" className="input-50" placeholder="Company"/>
                    <input name="location" ref={locationRef}  type="text" className="input-50" placeholder="Location"/>
                    <select name="type" ref={typeRef}  id="" className="input-50">
                        <option defaultValue="full_time">Full Time</option>
                        <option value="part_time">Part Time</option>
                    </select>
                    <input name="logo" type="file"  className="input-50" placeholder="Logo"/>
                    <textarea name="description" ref={descriptionRef} className="input-100" placeholder="Description"/>
                    <Link to={"/"} className="btn btn--secondary" type="submit">ADD</Link>
                </form>
            </div>
    )
}


export default AddJob