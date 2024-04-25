import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'
const HomeRoute = () => (
  <div className="home-image">
    <Header />
    <h1 className="home-heading">Find The Job That Fits Your Life</h1>
    <p className="home-para">
      Millions of people are searching for jobs, salary information,
      <br /> company reviews. Find the job that fitsyour abilities and
      potential.
    </p>
    <Link to="/jobs">
      <button className="job-button">Find Jobs</button>
    </Link>
  </div>
)
export default HomeRoute
