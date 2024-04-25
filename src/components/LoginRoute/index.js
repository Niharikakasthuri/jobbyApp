import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmittedError: false,
    errorMsg: '',
  }
  onSubmmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }
  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmmitSuccess(data.jwt_token)
    } else {
      this.loginFailed(data.error_msg)
    }
  }
  onUsername = event => {
    this.setState({username: event.target.value})
  }
  onPassword = event => {
    this.setState({password: event.target.value})
  }
  loginFailed = errorMsg => {
    this.setState({showSubmittedError: true, errorMsg})
  }
  render() {
    const {showSubmittedError, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="align">
          <div className="card-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            <form onSubmit={this.submitForm}>
              <label htmlFor="username" className="search-name">
                USERNAME
              </label>
              <input
                type="text"
                className="search-bar"
                placeholder="Username"
                onChange={this.onUsername}
                value={username}
                id="username"
              />
              <div>
                <label htmlFor="password" className="search-name">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="search-bar"
                  placeholder="Password"
                  onChange={this.onPassword}
                  value={password}
                  id="password"
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmittedError && (
                <p className="error-message">*{errorMsg}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginRoute
