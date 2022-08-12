import styled from './product.module.css'
import Rating from '../rating/Rating'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        <div className={styled.imgContainer}>
          <img src={product.image} alt='alt' />
        </div>
        <Link to={`/product/${product._id}`} className={styled.name}>
          {product.name}
        </Link>
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
  )
}

export default Product
