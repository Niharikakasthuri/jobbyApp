import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-card">
      <div className="align-2">
        <ul>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <Link to="/" className="link">
            <p className="nav-link">Home</p>
          </Link>
          <Link to="/jobs" className="link">
            <p className="nav-link">Jobs</p>
          </Link>
          <button onClick={onClickLogout} className="logout-button">
            Logout
          </button>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
