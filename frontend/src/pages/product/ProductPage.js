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
      alert('Review Submitted!')
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
        <div>loading</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <>
          <div>
            <div>
              <img src={product.image} alt={product.name} />
            </div>
            <div>
              <div>
                <div>
                  <h3>{product.name}</h3>
                </div>
                <div>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                <div>Price: ${product.price}</div>
                <div>Description: {product.description}</div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>Price:</div>
                      <div>
                        <strong>${product.price}</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div>Status:</div>
                      <div>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </div>
                    </div>
                  </div>

                  {product.countInStock > 0 && (
                    <div>
                      <div>
                        <div>Qty</div>
                        <div>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <button
                      onClick={addToCartHandler}
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <div>No Reviews</div>}
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
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && <div>{errorProductReview}</div>}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div>
                        <div>Rating</div>
                        <select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </select>
                      </div>
                      <div>
                        <div>Comment</div>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button type='submit'>Submit</button>
                    </form>
                  ) : (
                    <div>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default ProductPage

// (
//   <div className={styled.container}>
//     <div className={styled.imgContainer}>
//       <img src={product.image} alt='test' />
//     </div>
//     <div className={styled.infoContainer}>
//       <h2>{product.name}</h2>
//       <hr />
//       <Rating
//         value={product.rating}
//         text={`${product.numReviews} ${
//           product.numReviews === 0
//             ? 'No Reviews'
//             : product.numReviews === 1
//             ? 'Review'
//             : 'Reviews'
//         }`}
//       />
//       <hr />
//       <p>{product.price}</p>
//       <hr />
//       <p>{product.description}</p>
//     </div>
//     <div className={styled.addToCartBox}>
//       <div>
//         <h2>Price</h2>
//         <p>{product.price}</p>
//       </div>
//       <div>
//         <h2>Status</h2>
//         <p>{product.countInStock}</p>
//       </div>
//       {product.countInStock > 0 && (
//         <div>
//           <select
//             name='select'
//             value={qty}
//             onChange={(e) => setQty(e.target.value)}
//           >
//             {[...Array(product.countInStock).keys()].map((x) => (
//               <option key={x + 1} value={x + 1}>
//                 {x + 1}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//       <button
//         className={styled.btn}
//         disabled={product.countInStock === 0}
//         onClick={addToCartHandler}
//       >
//         Add to cart
//       </button>
//     </div>
//   </div>
// )
