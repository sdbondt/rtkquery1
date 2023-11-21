import React from "react"
import PostItem from "./PostItem"
import { useSelector } from "react-redux"
import { getSearchParams, useGetPostsQuery } from "../../services/postsSlice"
import { createQueryString } from "../../utils/createQueryString"
import PostsFilter from "./PostsFilter"
import Pagination from "./Pagination"

// display list of based, potentially based on user filters, on the Post home page 
const PostList = () => {
  // import search parameters from post state and turn it into a querystring, fetch posts based on the querystring
  const searchParams = useSelector(getSearchParams)
  const queryString = createQueryString(searchParams)
  const {
    data: { posts = [], totalCount } = {},
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPostsQuery(queryString)

  if (isFetching || isLoading) return <p>loading</p>
  if (posts.length === 0) return <p>No posts found</p>
  
  return (
    <div>
    <PostsFilter />
    <Pagination totalCount={totalCount} />
      {posts.map((post) => {
        return <PostItem post={post} key={post.id} />
      })}
      {isError ? <p>{error.data.msg || "Something went wrong"}</p> : ""}
    </div>
  )
}

export default PostList
