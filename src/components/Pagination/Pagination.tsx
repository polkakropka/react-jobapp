import React from 'react'
import './Pagination.scss'

const Pagination = (props:any ) => {
    const { pageNumbers, handleClick, currentPage } = props;

    return (
        <ul className="pagination">
            {pageNumbers.map((page:any) => {
                return (
                    <li
                        key={page}
                        id={page}
                        onClick={() => handleClick(page)}
                        className={currentPage === page ? `active` : "" } >
                        {page}
                    </li>
                );
            })}
        </ul>
    )
}

export default Pagination