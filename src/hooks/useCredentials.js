import { useMemo, useReducer } from "react"
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  // validate input fields
const validateEmail = (email) => EMAIL_REGEX.test(email)
const validatePassword = (password) => PASSWORD_REGEX.test(password)
const validateUsername = (username) => username.length > 1

// reducers for input fields and input fields validity
const credentialsReducer = (state, action) => ({
  ...state,
  ...action,
})

const fieldValidityReducer = (state, { payload, type }) => {
  if (type === "email") {
    return {
      ...state,
      email: validateEmail(payload),
    }
  }
  if (type === "password") {
    return {
      ...state,
      password: validatePassword(payload),
    }
  }
  if (type === "username") {
    return {
      ...state,
      username: validateUsername(payload),
    }
  }
}

// custom hook
const useCredentials = (initialState) => {
  const [credentials, dispatchCredentials] = useReducer(credentialsReducer, initialState)
  const [isValidField, dispatchIsValidField] = useReducer(fieldValidityReducer, {
    email: true,
    username: true,
    password: true,
  })

  // update credentials and field validity
  const handleChanges = (e) => dispatchCredentials({ [e.target.name]: e.target.value })
  const handleBlur = (e) => {
    setTimeout(() => {
      dispatchIsValidField({
        type: e.target.name,
        payload: e.target.value,
      })
    }, 500)
    }
    
    // update credentials and local storage for email storage
    const toggleRememberEmail = (e) => {
        if (e.target.checked) {
            localStorage.setItem('rememberEmail', credentials.email)
        } else {
            localStorage.removeItem('rememberEmail')
        }
        dispatchCredentials({ rememberEmail: e.target.checked })
    }

  // form is valid if all fields are valid and touched, except for the rememberEmail (=boolean)
  const formIsValid = useMemo(() => {
    const fieldsAreValid = isValidField.email && isValidField.username && isValidField.password
    const fieldsAreTouched = Object.values(credentials).every(value => {
      return typeof value === 'string' ? value.length > 0: true
    })
    return fieldsAreValid && fieldsAreTouched
  }, [credentials, isValidField])

  return {
    credentials,
    isValidField,
    formIsValid,
    handleChanges,
    handleBlur,
    toggleRememberEmail
  }
}

export default useCredentials
