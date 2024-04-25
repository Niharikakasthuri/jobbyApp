import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import SkillsCard from '../SkillsCard'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobData: [],
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getJobData()
  }
  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })
  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompnay: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    title: data.title,
  })
  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = this.getFormattedData(data.job_details)
      const updateSimilarData = data.similar_jobs.map(eachSimilar =>
        this.getFormattedSimilarData(eachSimilar),
      )
      this.setState({
        jobData: updateData,
        similarJobData: updateSimilarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  renderFailureView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          type="button"
          id="button"
          data-testid="button"
          onClick={this.getJobData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  renderJobDetailsRenderView = () => {
    const {jobData, similarJobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompnay,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobData
    const {description, imageUrl} = lifeAtCompnay
    return (
      <div>
        <div>
          <img src={companyLogoUrl} alt="job details company logo" />
          <div>
            <h1>{title}</h1>
            <BsStarFill />
            <p>{rating}</p>
          </div>
          <div>
            <MdLocationOn />
            <p>{location}</p>
          </div>
          <BsFillBriefcaseFill />
          <p>{employmentType}</p>
          <p>{packagePerAnnum}</p>
          <hr />
          <div>
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>
              Visit
              <BiLinkExternal />
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul>
            {skills.map(eachItem => (
              <SkillsCard skillDetails={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <div>
            <h1>Life at Company</h1>
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" />
          </div>
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobData.map(eachItem => (
              <SimilarJobItem jobDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsRenderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
  render() {
    return (
      <div>
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}
export default JobItemDetails
