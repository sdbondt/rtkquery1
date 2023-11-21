import React, { useMemo } from "react"
import useContent from "../../hooks/useContent"
import { useParams } from "react-router-dom"
import { useGetPostQuery } from "../../services/postsSlice"

// display update and delete options if user is the author of a post in Post view
const AuthorOptions = () => {
  const { postID } = useParams()
  const { data: { post } = {} } = useGetPostQuery(postID)
  
  // fetch content state, update toggle method, update and delete function and update and delete state from custom hook
  const { content,
    deleteContent: deletePost,
    updateContent: updatePost,
    showUpdateForm,
    handleContentChanges,
    toggleUpdateForm,
    isPostDeleteLoading,
    isPostDeleteError,
    postDeleteError,
    isPostUpdateError,
    isPostUpdateLoading,
    updatePostError } = useContent('Post', post)

  // consolidate delete & update loading and error state into one
  const isLoading = useMemo(
    () => isPostDeleteLoading || isPostUpdateLoading,
    [isPostDeleteLoading, isPostUpdateLoading]
  )
  const isError = useMemo(
    () => isPostDeleteError || isPostUpdateError,
    [isPostDeleteError, isPostUpdateError]
  )
  const errorMsg = useMemo(() => {
    if (postDeleteError) return postDeleteError.data.msg || "Something went wrong"
    if (updatePostError) return updatePostError.data.msg || "Something went wrong"
  }, [postDeleteError, updatePostError])


  if (isLoading) return <p>loading</p>

  return (
    <div>
      <div>
        <button type="button" onClick={deletePost} disabled={isLoading}>
          Delete Post
        </button>
        <button type="button" onClick={toggleUpdateForm} disabled={isLoading}>
          Update Post
        </button>
      </div>
      {showUpdateForm && (
        <form onSubmit={updatePost}>
          <textarea value={content} onChange={handleContentChanges}></textarea>
          <button type="submit" disabled={isLoading}>
            Update
          </button>
        </form>
      )}
      {isError ? <p>{errorMsg}</p> : ""}
    </div>
  )
}

export default AuthorOptions
