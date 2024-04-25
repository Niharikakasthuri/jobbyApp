import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
  } = jobDetails
  return (
    <li>
      <div>
        <img src={companyLogoUrl} alt="similar job company logo" />
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
    </li>
  )
}
export default SimilarJobItem
