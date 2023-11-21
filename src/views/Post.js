import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import useUserID from '../hooks/useUserID'
import AuthorOptions from '../components/posts/AuthorOptions'
import Comments from '../components/comments/Comments'
import displayDate from '../utils/displayDate'
import { useGetPostQuery } from '../services/postsSlice'

// /post/:postID view page
const Post = () => {
    // get post from rtk query based on route param, get userId with custom hook and check if authenticated user is the post author
    const { postID } = useParams()
    const { data: { post } = {}, isLoading, isFetching } = useGetPostQuery(postID)
    const userID = useUserID()
    const isAuthor = useMemo(() => post ? post.user.id === userID : false, [post, userID])

    useEffect(() => {
      if (!post) document.title = 'No post found'
      else document.title = post.user?.username ? `Post by ${post.user.username}`: 'Post'
      }, [post])
    
    if (isLoading || isFetching) return <p>loading</p>
    if (!post) return <p>No post found</p>
    return (
      <div>
        <h4>{post.user.username}</h4>
        <p>{post.content}</p>
        <p>{displayDate(post.createdAt)}</p>
        {isAuthor ? <AuthorOptions /> : ''}
        <Comments />
      </div>
  )
}

export default Post