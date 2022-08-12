import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartAtions'
import styled from './cartPage.module.css'

const CartPage = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    //revisar
    navigate('/login?redirect=shipping')
  }

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  return (
    <>
      <h1>CartPage</h1>
      {cartItems.length === 0 ? (
        <h2>
          Your cart is empty <Link to='/'>Go Back</Link>
        </h2>
      ) : (
        <div className={styled.container}>
          <div>
            {cartItems.map((item) => (
              <div className={styled.itemsContainer}>
                <div className={styled.product}>
                  <div className={styled.imgContainer}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>{item.price}</div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button onClick={() => removeFromCartHandler(item.product)}>
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styled.box}>
            <div>
              {' '}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </div>
            <button disabled={cartItems.length === 0} onClick={checkoutHandler}>
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </>
  )
}
export default CartPage
