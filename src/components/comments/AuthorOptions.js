import React, { useMemo} from "react"
import useContent from "../../hooks/useContent"

// display author options if user is the author or a comment in CommentItem
const AuthorOptions = ({ comment }) => {
  // fetch content and change content handler, update and delete methods and error and loading states from custom hook
  const { content,
    updateContent: updateComment,
    deleteContent: deleteComment,
    handleContentChanges,
    isUpdateCommentError,
    isUpdateCommentLoading,
    updateCommentError,
    isDeleteCommentError,
    isDeleteCommentLoading,
    deleteCommentError,
    showUpdateForm,
    toggleUpdateForm
  } = useContent('Comment', comment)

  // consolidate delete & update loading and error state and message
  const isLoading = useMemo(
    () => isUpdateCommentLoading || isDeleteCommentLoading,
    [isUpdateCommentLoading, isDeleteCommentLoading]
  )
  const isError = useMemo(
    () => isUpdateCommentError || isDeleteCommentError,
    [isUpdateCommentError, isDeleteCommentError]
  )
  const errorMsg = useMemo(() => {
    if (updateCommentError) return updateCommentError.data.msg || "Something went wrong"
    if (deleteCommentError) return deleteCommentError.data.msg || "Something went wrong"
  }, [updateCommentError, deleteCommentError])


  if (isLoading) return <p>loading</p>
  return (
    <div>
      <div>
        <button
          type="button"
          disabled={isLoading}
          onClick={deleteComment}
        >
          Delete Comment
        </button>
        <button type="button" disabled={isLoading} onClick={toggleUpdateForm}>
          Update Comment
        </button>
      </div>
      {showUpdateForm && (
        <form onSubmit={updateComment}>
          <textarea value={content} onChange={handleContentChanges} />
          <button type="submit" disabled={isLoading}>
            Update comment
          </button>
        </form>
      )}
      {isError ? <p>{errorMsg}</p> : ""}
    </div>
  )
}

export default React.memo(AuthorOptions)
