import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToken, useLoginMutation } from '../../services/authSlice'
import useCredentials from '../../hooks/useCredentials'

const rememberedEmail = localStorage.getItem('rememberEmail')
const initialState = {
  email: rememberedEmail || '',
  password: "",
  rememberEmail: Boolean(rememberedEmail)
}

const Login = () => {
  const { credentials, isValidField, formIsValid, handleChanges, handleBlur, toggleRememberEmail } = useCredentials(initialState)
  const [login, { isError, error, isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef()
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await login(credentials)
    if (response.data) {
      dispatch(setToken(response.data.token))
      navigate("/")
    }
  }

  useEffect(() => {
    ref.current.focus()
    document.title = 'Login to our page'
  }, [])

  if (isLoading) return <p>loading</p>

  return (
    <fieldset>
      <legend>Login</legend>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            value={credentials.email}
            onChange={handleChanges}
            onBlur={handleBlur}
            ref={ref}
          />
          { !isValidField.email && <p aria-live="polite">Must enter a valid email</p> }
        </div>
        
        <input
          type="password"
          name="password"
          placeholder="enter your password"
          value={credentials.password}
          onChange={handleChanges}
        />
        <button type="submit" disabled={!formIsValid}>Login</button>
        <input
          type="checkbox"
          id="rememberEmail"
          name="rememberEmail"
          checked={credentials.rememberEmail}
          onChange={toggleRememberEmail}
          disabled={!isValidField.email}
        />
        <label htmlFor="rememberEmail">Remember my email</label>
      </form>
      {isError ? <p>{error.data.msg || 'Something went wrong'}</p>: ''}
    </fieldset>
  )
}

export default Login