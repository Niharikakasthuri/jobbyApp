import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocation} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'
const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobData
  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div>
          <img src={companyLogoUrl} alt="company logo" />
          <div>
            <h1>{title}</h1>
            <AiFillStar />
            <p>{rating}</p>
          </div>
        </div>
        <div>
          <IoLocation />
          <p>{location}</p>
          <BsFillBriefcaseFill />
          <p>{employmentType}</p>
          <p>{packagePerAnnum}</p>
          <hr />
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
