import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchParams, setSearchParams } from '../../services/postsSlice'

// display the pagination options in the PostLists component
const Pagination = ({ totalCount }) => {
    // import search params from posts state and create maxpage based on totalcount and limit
    const { page, limit } = useSelector(getSearchParams)
    const maxPage = useMemo(() => Math.ceil(totalCount / limit), [totalCount, limit])
    const dispatch = useDispatch()
    
    const goToFirstPage = () => dispatch(setSearchParams({ page: 1 }))
    const goToNextPage = () => dispatch(setSearchParams({ page: page + 1 }))
    const goToPreviousPage = () => dispatch(setSearchParams({ page: page - 1 }))
    const goToLastPage = () => dispatch(setSearchParams({ page: maxPage }))
  return (
      <div>
          <button type="button" onClick={goToFirstPage} disabled={page === 1}>1</button>
          { maxPage > 1 ? <button type='button' onClick={goToNextPage} disabled={page === maxPage}>+</button>: ''}
          <span>{page}</span>
          { maxPage > 1 ? <button type="button" onClick={goToPreviousPage} disabled={page === 1} >-</button>: ''}
          { maxPage > 1 ? <button type="button" onClick={goToLastPage} disabled={page === maxPage} >{maxPage}</button>: ''}
      </div>
  )
}
export default React.memo(Pagination)
