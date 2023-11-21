import React from "react"
import CommentsList from "./CommentsList"
import CommentForm from "./CommentForm"

// display Comments block in /posts/:postID route
const Comments = () => {
  return (
    <>
      <CommentForm />
      <CommentsList />
    </>
  )
}

export default Comments
