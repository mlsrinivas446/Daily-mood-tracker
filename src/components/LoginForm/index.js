import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showPassword: false,
  }

  submitForm = event => {
    event.preventDefault()
    this.getUserLogin()
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  getUserLogin = async () => {
    const {username, password} = this.state
    const userCredientails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredientails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === 200) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  setUsername = event => {
    this.setState({username: event.target.value})
  }

  setPassword = event => {
    this.setState({password: event.target.value})
  }

  setPasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  render() {
    const {errorMsg, username, password, showPassword} = this.state

    return (
      <div className="login-page-container" data-testid="loginPageContainer">
        <form className="login-form-container" onSubmit={this.submitForm}>
          <h1 className="login-heading">Daily Mood Tracker</h1>
          <div className="input-container">
            <label className="login-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              id="username"
              name="username"
              value={username}
              onChange={this.setUsername}
            />
          </div>
          <div className="input-container">
            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="login-input"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.setPassword}
            />
          </div>
          <div className="password-visability-checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              id="passwordVisibility"
              checked={showPassword}
              onChange={this.setPasswordVisibility}
            />
            <label className="checkbox-label" htmlFor="passwordVisibility">
              Show Password
            </label>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
