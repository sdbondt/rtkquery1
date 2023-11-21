import React from 'react'
import AuthorOptions from './AuthorOptions'
import displayDate from '../../utils/displayDate'

// display comment item in comments list
const CommentItem = ({ comment }) => {
  return (
      <div>
          <h4>{comment.user.username}</h4>
          <p>{comment.content}</p>
          <p>{displayDate(comment.createdAt)}</p>
          <AuthorOptions comment={comment} />
      </div>
  )
}

export default React.memo(CommentItem)