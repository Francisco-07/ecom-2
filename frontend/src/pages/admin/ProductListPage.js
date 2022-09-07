import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import Paginate from '../../components/pagination/Pagination'
import styled from './adminPages.module.css'
import Spinner from '../../components/spinner/Spinner'
import Error from '../../components/error/Error'

const ProductListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pageNumber } = useParams()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
    navigate,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = (product) => {
    dispatch(createProduct())
  }

  return (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        <div>
          <div>
            <h1>Productos</h1>
          </div>
          <div>
            <button onClick={createProductHandler}>Crear Producto</button>
          </div>
        </div>
        {loadingDelete && <Spinner />}
        {errorDelete && <Error>{errorDelete}</Error>}
        {loadingCreate && <Spinner />}
        {errorCreate && <Error>{errorCreate}</Error>}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Error>{error}</Error>
        ) : (
          <>
            <div className={styled.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>PRECIO</th>
                    <th>CATEGORIA</th>
                    <th>MARCA</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <button>Editar</button>
                        </Link>
                        <button onClick={() => deleteHandler(product._id)}>
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </div>
    </div>
  )
}

export default ProductListPage
