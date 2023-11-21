import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom"
import Auth from "../views/Auth"
import { useSelector } from "react-redux"
import { getToken } from "../services/authSlice"
import { useEffect } from "react"
import Posts from "../views/Posts"
import Post from "../views/Post"
import NotFound from "../views/NotFound"

const PrivateRoute = ({children}) => {
  const token = useSelector(getToken)
    const navigate = useNavigate()
    useEffect(() => {
        if(!token) navigate('/auth')
    }, [token, navigate])
  return children
}

const router = createBrowserRouter([
  { path: "/auth", element: <Auth /> },
  {
    path: "/",
    element: <Navigate to="/posts" />,
  },
  {
    path: '/posts',
    element: (
      <PrivateRoute>
        <Posts />
      </PrivateRoute>
    )
  },
  {
    path: '/posts/:postID',
    element: (
      <PrivateRoute>
        <Post />
      </PrivateRoute>
    )
  },
  {
    path: '*',
    element: (
      <PrivateRoute>
        <NotFound />
      </PrivateRoute>
    )
  }
])

export default router
