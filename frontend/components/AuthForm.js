import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function AuthForm(props) {
  const [isNewUser, setIsNewUser] = useState(false)
  const {
    login,
    register,
    authInputChange,
    authForm: { username, password },
    navigate,
    auth,
  } = props

  useEffect(() => {
    if (auth.user) navigate('/')
  }, [auth.user])

  const onChange = evt => {
    const { id, value } = evt.target
    authInputChange({ id, value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    const callback = isNewUser ? register : login
    callback({ username, password })
  }

  const isDisabled = () => {
    return (
      username.trim().length < 3 ||
      password.trim().length < 4
    )
  }

  const toggleMode = evt => {
    evt.preventDefault()
    setIsNewUser(!isNewUser)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        maxLength={200}
        value={username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        type="password"
        maxLength={100}
        value={password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <div className="button-group">
        <button className="jumbo-button" disabled={isDisabled()} id="submitCredentials">
          {isNewUser ? "Register New User" : "Login"}
        </button>
      </div>
      <div>
        <a onClick={toggleMode}>
          {isNewUser
            ? "Already have an account? Login instead"
            : "New to the site? Register instead"}
        </a>
      </div>
    </form>
  )
}

export default connect(st => ({
  authForm: st.authForm,
  auth: st.auth,
}), {
  login: actions.login,
  register: actions.register,
  authInputChange: actions.authInputChange,
})(AuthForm)
