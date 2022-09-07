import styled from './product.module.css'
import Rating from '../rating/Rating'
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'

const Product = ({ product }) => {
  return (
    <div className={styled.container}>
      <div className={styled.icons}>
        <AiOutlineShoppingCart />
        <BsSearch />
      </div>
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
.container {
    display: flex;
    justify-content: center;
    width: 220px;
    border: 1px solid var(--secondary-color);
    border-radius: 3px;
    position: relative;
  }
  
  .icons {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--medium-gap);
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.5s ease;
    cursor: pointer;
  }
  .icons svg {
    font-size: 1.6rem;
  }
  
  .container:hover .icons {
    opacity: 1;
  }
  .wrapper {
    background-color: var(--primary-color);
    width: 100%;
    color: var(--secondary-color);
    padding: 20px 20px;
  }
  
  .imgContainer img {
    width: 100%;
    height: 200px;
    border-radius: 3px;
    object-fit: cover;
  }
  
  .name {
    text-decoration: none;
  }
  
  .reviews {
  }
  
  .price {
  }
  