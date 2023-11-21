import React from 'react'
import CommentItem from './CommentItem'
import { useParams } from 'react-router-dom'
import { useGetPostQuery } from '../../services/postsSlice'


// display comments list in Comments
const CommentsList = () => {
  // fetch post from rtk query with route parameter and display it's comments
  const { postID } = useParams()
  const { data: { post } = {}} = useGetPostQuery(postID)
  if (post.comments.length === 0) return <p> No comments</p>
    
  return (
      <div>
      {post.comments.map((comment) =>
        <CommentItem comment={comment} key={comment.id} /> )}
      </div>
  )
}

export default CommentsList