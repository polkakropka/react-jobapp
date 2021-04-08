import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const Header: React.FC = () => {
    return (
        <div className="job-app__top l-container">
            <div className="star-wars-vader"></div>
            <div className="job-app__header">
                <Link to="/">
                    <div className="job-app__header__logo">
                        <h1 className="h-h1-special center">Star Jobs</h1>
                    </div>
                    <div className="job-app__header__content">
                        <h2 className="h-h2-special center">May the best jobs be with you</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header