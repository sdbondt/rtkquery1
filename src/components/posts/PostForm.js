import React from "react"
import useContent from "../../hooks/useContent"

// display the add post form on the Posts home page
const PostForm = () => {
  // fetch content, handle change methods, post submithandler and post state from content custom hook
  const {
    content,
    handleContentChanges,
    addContent: addPost,
    createPostError: error,
    isCreatePostError: isError,
    isCreatePostLoading: isLoading,
  } = useContent()

  if (isLoading) return <p>loading</p>
  return (
    <fieldset>
      <legend>Add Post</legend>
      <form onSubmit={addPost}>
        <textarea
          value={content}
          placeholder="Add content"
          onChange={handleContentChanges}
        />
        <button type="submit">Add Post</button>
      </form>
      {isError ? (
        <p aria-live="polite">{error.data.msg || "Something went wrong"}</p>
      ) : (
        ""
      )}
    </fieldset>
  )
}

export default PostForm
