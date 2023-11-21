import React, { useEffect } from 'react'
import PostList from '../components/posts/PostList'
import PostForm from '../components/posts/PostForm'

const Posts = () => {
  useEffect(() => {
    document.title = 'Posts'
  }, [])

  return (
    <>
      <PostForm />
      <PostList />
    </>
  )
}

export default Posts