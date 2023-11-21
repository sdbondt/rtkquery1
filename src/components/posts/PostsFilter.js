import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchParams, setSearchParams } from "../../services/postsSlice"

// display filter options and search bar in the PostsList component
const PostsFilter = () => {
  // get filter values from posts state
  const { q, direction, limit } = useSelector(getSearchParams)
  const dispatch = useDispatch()
  const ref = useRef()

  useEffect(() => {
    ref.current.focus()
  }, [q])

  // update the search params
  const handleChanges = (e) => dispatch(setSearchParams({ [e.target.name]: e.target.value }))

  return (
    <form>
      <input
        type="text"
        placeholder="Search for a post"
        name="q"
        value={q}
        onChange={handleChanges}
        ref={ref}
      />
      <select name="direction" value={direction} onChange={handleChanges}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <select name="limit" value={limit} onChange={handleChanges}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </form>
  )
}

export default PostsFilter
