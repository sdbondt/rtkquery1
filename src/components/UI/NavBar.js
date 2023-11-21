import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, logout } from '../../services/authSlice'

const NavBar = () => {
    const token = useSelector(getToken)
    const dispatch = useDispatch()
    const handleLogout = () => dispatch(logout())

    if(token) return (
      <div>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    )
    return <p>Welcome on our site</p>
}

export default NavBar