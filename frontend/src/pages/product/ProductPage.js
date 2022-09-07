import { useEffect, useState } from 'react'
import styled from './productPage.module.css'
import Rating from '../../components/rating/Rating'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProductDetails,
  createProductReview,
} from '../../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import Spinner from '../../components/spinner/Spinner'
import Error from '../../components/error/Error'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const ProductPage = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [qty, setQty] = useState(1)

  const { id } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)

  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Comentario Enviado')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(id))
  }, [dispatch, id, successProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <div className={styled.container}>
          <div className={styled.wrapper}>
            <div className={styled.productInfo}>
              <div className={styled.imgContainer}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styled.infoContainer}>
                <div>
                  <div>
                    <h3>{product.name}</h3>
                  </div>
                  <hr />
                  <div>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>
                  <hr />
                  <div>Precio: ${product.price}</div>
                  <hr />
                  <div> {product.description}</div>
                </div>
              </div>

              <div className={styled.addToCart}>
                <div className={styled.cartBox}>
                  <div>
                    Precio: <strong>${product.price}</strong>
                  </div>
                  <hr />
                  <div>
                    Estado:
                    {product.countInStock > 0 ? 'Hay Stock' : 'Sin Stock'}
                  </div>
                  <hr />
                  {product.countInStock > 0 && (
                    <div>
                      Cantidad{' '}
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <hr />
                  <div>
                    <button
                      className={styled.icon}
                      onClick={addToCartHandler}
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      <AiOutlineShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styled.review}>
              <div className={styled.reviewContainer}>
                <h2>comentarios</h2>
                {product.reviews.length === 0 && <div>No hay comentario</div>}
                <div>
                  {product.reviews.map((review) => (
                    <div key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                  <div>
                    <h2>Dejanos un comentario</h2>
                    {errorProductReview && <Error>{errorProductReview}</Error>}
                    {userInfo ? (
                      <form onSubmit={submitHandler} className={styled.form}>
                        <select
                          name='rating'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Seleccionar</option>
                          <option value='1'>1 - Muy malo</option>
                          <option value='2'>2 - Malo</option>
                          <option value='3'>3 - Bueno</option>
                          <option value='4'>4 - Muy bueno</option>
                          <option value='5'>5 - Excelente</option>
                        </select>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <button type='submit'>Publicar</button>
                      </form>
                    ) : (
                      <div>
                        <Link to='/login'>
                          <strong>Ingrese</strong>
                        </Link>{' '}
                        para dejar un comentario
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default ProductPage
