import React, { useEffect, useRef } from 'react'
import useCredentials from '../../hooks/useCredentials'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToken, useSignupMutation } from '../../services/authSlice'

const initialState = {
  email: "",
  password: "",
  username: "",
}

const Signup = () => {
  const { credentials, isValidField, formIsValid, handleChanges, handleBlur } = useCredentials(initialState)
  const [signup, { isError, error, isLoading }] = useSignupMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await signup(credentials)
    if (response.data) {
      dispatch(setToken(response.data.token))
      navigate("/")
    }
  }

  useEffect(() => {
    ref.current.focus()
    document.title= "Signup here"
  }, [])

  if (isLoading) return <p>loading</p>
  
  return (
    <fieldset>
      <legend>Signup</legend>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="enter your email"
            name="email"
            autoComplete="email"
            value={credentials.email}
            onChange={handleChanges}
            onBlur={handleBlur}
            ref={ref}
          />
          { !isValidField.email && <p aria-live="polite">Must enter a valid email</p> }
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="enter your username"
            autoComplete="username"
            value={credentials.username}
            onChange={handleChanges}
            onBlur={handleBlur}
          />
          { !isValidField.username && <p aria-live="polite">Username must be at least two characters long</p>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="enter your password"
            autoComplete="password"
            value={credentials.password}
            onChange={handleChanges}
            onBlur={handleBlur}
          />
          { !isValidField.password && <p aria-live="polite">Password must be 6 characters long and contain an uppercase, lowercase, numeric and special character</p>}
          </div>
        <button type="submit" disabled={!formIsValid}>signup</button>
      </form>
      <div>
        {isError ? <p aria-live="polite">{error.data.msg}</p>: ''}
      </div>
    </fieldset>
  )
}

export default Signup