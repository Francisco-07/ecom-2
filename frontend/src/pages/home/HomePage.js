import ProductContainer from '../../containers/product/ProductContainer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/pagination/Pagination'

const HomePage = () => {
  const productList = useSelector((state) => state.productList)
  const { keyword, pageNumber } = useParams()
  const { loading, error, products, page, pages } = productList

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h2>lastest products</h2>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <ProductContainer products={products} />
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}
export default HomePage
