import ProductContainer from '../../containers/product/ProductContainer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/pagination/Pagination'
import Slider from '../../components/slider/Slider'
import Footer from '../../components/footer/Footer'
import Error from '../../components/error/Error'
import Spinner from '../../components/spinner/Spinner'

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
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <>
          <Slider />
          {loading ? <Spinner /> : <ProductContainer products={products} />}
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
          <Footer />
        </>
      )}
    </>
  )
}
export default HomePage
