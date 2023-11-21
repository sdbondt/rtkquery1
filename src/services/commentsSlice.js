import { api } from "./api";

export const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: ({ postID, content }) => ({
                url: `/posts/${postID}/comments`,
                method: 'POST',
                body: { content }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: arg.postID }] 
        }),
        updateComment: builder.mutation({
            query: ({ comment, content }) => ({
                url: `/comments/${comment.id}`,
                method: 'PATCH',
                body: { content}
            }),
            invalidatesTags: (result, error, arg) => {
                const id = arg.comment.postID
                return [{ type: 'Posts', id }]
            }
            
        }),
        deleteComment: builder.mutation({
            query: (comment) => ({
                url: `/comments/${comment.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: arg.postID }] 
        })
    })
})

export const {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation
} = extendedApiSlice