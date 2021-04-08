import './JobDetailsPage.scss'
import { convertDateString } from '../../helpers/helpers'
import { Job } from '../../interfaces/interfaces'

const JobsDetailPage = (props: {detail: Job}) => {
    return (
        <div className="job-app__details-page l-container">
            <div className="job-app__details-page__container">
                <div className="job-app__details-page__container__top">
                    <div className="job-app__details-page__content__title">
                        <h2>{props.detail.title}</h2>
                        <a className="company-logo" href={props.detail.url}>
                            <img src={props.detail.company_logo} alt={props.detail.company}/>
                        </a>
                    </div>
                    <div className="job-app__details-page__content__title__details">
                        <p><span className="icon icon-planet"></span><span>{props.detail.location}</span></p>
                        <p><span className="icon icon-light-saber"></span><span>{props.detail.company}</span></p>
                        <p><span className="icon icon-darth-vader"></span><span>{props.detail.type}</span></p>
                        <p><span className="icon  icon-r2d2"></span><span>{convertDateString(props.detail.created_at)}</span></p>
                    </div>
                </div>
                <div className="job-app__details-page__content__container">
                    <div className="job-app__details-page__content__description"
                         dangerouslySetInnerHTML={{ __html: props.detail.description }}/>
                </div>
            </div>
        </div>
    )
}

export default JobsDetailPage