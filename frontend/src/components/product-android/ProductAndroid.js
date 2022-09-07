import styled from './productAndroid.module.css'
import Rating from '../rating/Rating'
import { Link } from 'react-router-dom'

const ProductAndroid = ({ product }) => {
  return (
    <div className={styled.product}>
      <div className={styled.container}>
        <Link to={`/product/${product._id}`} className={styled.name}>
          <div className={styled.wrapper}>
            <div className={styled.imgContainer}>
              <img src={product.image} alt='alt' />
            </div>
            <div className={styled.infoContainer}>
              <div>{product.name}</div>
              <div className={styled.reviews}>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} ${
                    product.numReviews === 0
                      ? 'No Reviews'
                      : product.numReviews === 1
                      ? 'Review'
                      : 'Reviews'
                  }`}
                />
              </div>
              <div className={styled.price}>${product.price}</div>
            </div>
          </div>
        </Link>
      </div>
      <hr />
    </div>
  )
}
export default ProductAndroid
