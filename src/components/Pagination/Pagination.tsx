import {useEffect, useState} from 'react'
import './Pagination.scss'
import { store } from '../../store/store'

const Pagination = () => {
    const [totalJobs, setTotalJobs] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [jobsPerPage, setJobsPerPage] = useState(10)
    const pageNumbers = []
    const paginate = (pageNumber: number) => {setCurrentPage((pageNumber))}
    store.subscribe(() => {
        setTotalJobs(store.getState().jobSearchReducer.totalJobs)
    })
    useEffect(() => {
        store.dispatch({ type: 'UPDATE_CURRENT_PAGE', number: currentPage })

    }, [currentPage])
    for(let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <ul className="pagination">
            <li><a href="#"><span className={currentPage <= 1 ? `hidden` : `icon-double-arrow icon-double-arrow--left` }> </span></a></li>
            <li><a href="#"><span className={currentPage <= 1 ? `hidden` : `icon-single-arrow icon-single-arrow--left` }> </span></a></li>
            {pageNumbers.map((number) => (
                <li className={currentPage === number ? `active` : "" } key={number} >
                    <a onClick={() => paginate(number)} href={"#" + number}>
                        {number}
                    </a>
                </li>
            ))}
            <li><a href="#"><span className={currentPage >= pageNumbers.length ? `hidden` : `icon-single-arrow icon-single-arrow--right` }> </span></a></li>
            <li><a href="#"><span className={currentPage >= pageNumbers.length ? `hidden` : `icon-double-arrow icon-double-arrow--right` }> </span></a></li>
        </ul>
    )
}

export default Pagination