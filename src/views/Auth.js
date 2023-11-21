import React, { useState } from "react"
import Login from "../components/auth/Login"
import Signup from "../components/auth/Signup"

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true)
  const toggleComponent = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowLogin((val) => !val)
  }
  return (
    <div>
      {showLogin ? 
        <Login key="login" />:
        <Signup key="signup" />
      }
      <button type="button" onClick={toggleComponent}>
        {showLogin ? "Signup instead" : "Login instead"}
      </button>
    </div>
  )
}

export default Auth
