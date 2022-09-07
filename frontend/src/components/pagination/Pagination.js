import React from 'react'
import { Link } from 'react-router-dom'
import styled from './pagination.module.css'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <ul className={styled.pagination}>
        {[...Array(pages).keys()].map((x) => (
          <Link
            className={styled.page}
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <li active={Number(x + 1 === page)}>{x + 1}</li>
          </Link>
        ))}
      </ul>
    )
  )
}

export default Paginate
