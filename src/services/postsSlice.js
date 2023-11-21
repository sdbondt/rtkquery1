import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
        q: '',
        direction: 'desc',
        limit: 10,
        page: 1
}

// set initial search params state and create handler method, import in store
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setSearchParams: (state, { payload }) => {
            Object.assign(state, payload)
        }
    }
})

// add endpoint methods to api
const extendedApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: (queryString = '') => '/posts' + queryString,
            // CREATE TAGS FOR {type: 'Posts', id: 'LIST'} and individual post ({type: 'Posts', id: postID})
            providesTags: (result) => {
                return result ? [
                    ...result.posts.map(({ id }) => ({ type: 'Posts', id })),
                    { type: 'Posts', id: 'LIST'}
                ]: [{ type: 'Posts', id: 'LIST'}]
            }
        }),
        getPost: builder.query({
            query: (postID) => `/posts/${postID}`,
            transformResponse: (response) => {
                const { post } = response
                const comments = post.comments.map((comment) => {
                    return {
                        ...comment,
                        postID: post.id
                    }
                }) || []
                return {
                    post: {
                        ...post,
                        comments
                    }
                }
            },
            // CREATE TAG FOR SINGLE POST, NOT NECESSERALIY COVERED BY getPosts tags
            providesTags: (result) => {
               return [{ type: 'Posts', id: result.post.id }]
            }
        }),
        createPost: builder.mutation({
            query: (content) => ({
                url: '/posts',
                method: 'POST',
                body: { content }
            }),
            // INVALIDATE POSTS LIST ON POST CREATION
            invalidatesTags: [{ type: 'Posts', id: 'LIST'}]
        }),
        updatePost: builder.mutation({
            query: ({ postID, content }) => ({
                url: `/posts/${postID}`,
                method: 'PATCH',
                body: { content }
            }),
            // INVALIDATE SINGLE POST ON UPDATE
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'Posts', id: arg.postID }]
            }
        }),
        deletePost: builder.mutation({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'DELETE'
            }),
            // INVALIDATE POSTS LIST ON POST DELETION
            invalidatesTags: [{type: 'Posts', id: 'LIST' }]
        }),
    })
})

export const getSearchParams = (state) => state.posts
export const { setSearchParams } = postsSlice.actions

export const {
    useGetPostQuery,
    useGetPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = extendedApiSlice

export default postsSlice.reducer