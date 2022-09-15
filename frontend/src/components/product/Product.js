import styled from './product.module.css'
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../actions/cartAtions'

const Product = ({ product }) => {
  const dispatch = useDispatch()
  const qty = 1
  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
  }

  return (
    <div className={styled.container}>
      <div className={styled.icons}>
        <div className={styled.iconContainer}>
          <AiOutlineShoppingCart onClick={addToCartHandler} />
        </div>
        <Link to={`/product/${product._id}`} className={styled.name}>
          <div className={styled.iconContainer}>
            <BsSearch />
          </div>
        </Link>
      </div>
      <div className={styled.wrapper}>
        <div className={styled.imgContainer}>
          <img src={product.image} alt='alt' loading='lazy' />
        </div>
      </div>
    </div>
  )
}

export default Product
