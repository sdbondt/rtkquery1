import React from 'react'
import useContent from '../../hooks/useContent'

// display add comments form in Comments component
const CommentForm = () => {
    // fetch content state, add comment method, handle change method and comment state from custom hook
    const { content,
        addContent: addComment,
        handleContentChanges,
        isCreateCommentError: isError,
        createCommentError: error,
        isCreateCommentLoading: isLoading } = useContent('Comment')

    if(isLoading) return <p>loading</p>
    return (
      <fieldset>
          <legend>Add a comment</legend>
          <form onSubmit={addComment}>
              <textarea
                  value={content}
                  onChange={handleContentChanges}
                  placeholder='Add a comment here'
              />
              <button type="submit" disabled={isLoading} >Add Comment</button>
          </form>
          {isError ? <p aria-live="polite">{ error.data.msg || 'Something went wrong'}</p>: ''}
      </fieldset>
    )
}

export default CommentForm