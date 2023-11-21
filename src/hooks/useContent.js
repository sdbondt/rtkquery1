import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from "../services/commentsSlice"
import { useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation } from "../services/postsSlice"

const useContent = (type = 'Post', initialDocument = {}) => {
    // set content and update display state
    const [content, setContent] = useState(initialDocument.content)
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    // import rtk query methods
    const [createPost, { isError: isCreatePostError, error: createPostError, isLoading: isCreatePostLoading }] = useCreatePostMutation()
    const [createComment, { isError: isCreateCommentError, error: createCommentError, isLoading: isCreateCommentLoading }] = useCreateCommentMutation()
    const [deletePost, { isError: isPostDeleteError, error: postDeleteError, isLoading: isPostDeleteLoading}] = useDeletePostMutation()
    const [updatePost, { isError: isPostUpdateError, error: updatePostError, isLoading: isPostUpdateLoading }] = useUpdatePostMutation()
    const [deleteComment, { isError: isDeleteCommentError, error: deleteCommentError, isLoading: isDeleteCommentLoading}] = useDeleteCommentMutation()
    const [updateComment, { isError: isUpdateCommentError, isLoading: isUpdateCommentLoading, error: updateCommentError }] = useUpdateCommentMutation()

    // methods for updating the content input tag and toggling the update form display
    const handleContentChanges = (e) => setContent(e.target.value)
    const toggleUpdateForm = () => setShowUpdateForm((val) => !val)

    // create post and content add submithandler
    const addContent = async (e) => {
        e.preventDefault()
        if (type === 'Post') await createPost(content)
        if (type === 'Comment') {
            const { postID } = params
            await createComment({
                content,
                postID
            })
        }
        setContent('')
    }

    const deleteContent = async () => {
        if (type === 'Post') {
            await deletePost(initialDocument)
            navigate('/posts')
        }
        if (type === 'Comment') await deleteComment(initialDocument)
    }

    // use rtk query method to update post or comment and toggle the form
    const updateContent = async (e) => {
        e.preventDefault()
        if (type === 'Post') await updatePost({
                postID: initialDocument.id,
                content
        })
        if (type === 'Comment') await updateComment({
            comment: initialDocument,
            content
        })
        toggleUpdateForm()
    }

    return {
        content,
        showUpdateForm,
        setContent,
        handleContentChanges,
        addContent,
        deleteContent,
        updateContent,
        toggleUpdateForm,
        isCreatePostError,
        isCreatePostLoading,
        createPostError,
        isCreateCommentError,
        isCreateCommentLoading,
        createCommentError,
        isPostDeleteError,
        isPostDeleteLoading,
        postDeleteError,
        isPostUpdateError,
        isPostUpdateLoading,
        updatePostError,
        isUpdateCommentError,
        isUpdateCommentLoading,
        updateCommentError,
        isDeleteCommentError,
        isDeleteCommentLoading,
        deleteCommentError
    }
}

export default useContent