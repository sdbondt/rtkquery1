import React from 'react'
import { Link } from 'react-router-dom'
import displayDate from '../../utils/displayDate'

// display a post item in PostList component and link to /posts/:postID
const PostItem = ({ post }) => {
  return (
      <div>
          <h4>{post.user.username} </h4>
          <p>{post.content}</p>
          <p>{displayDate(post.createdAt)}</p>
          <Link to={`/posts/${post.id}`}>See Post</Link>
      </div>
  )
}

export default React.memo(PostItem)