import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartAtions'
import styled from './cartPage.module.css'
import { BsTrash } from 'react-icons/bs'

const CartPage = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    userInfo ? navigate('/shipping') : navigate('/login')
  }

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  return (
    <>
      {cartItems.length === 0 ? (
        <div className={styled.emptyCart}>
          <h2>Esta vacio</h2>
          <Link to='/'>
            <button>Volver</button>
          </Link>
        </div>
      ) : (
        <div className={styled.container}>
          <div className={styled.wrapper}>
            <div>
              {cartItems.map((item) => (
                <div>
                  <div className={styled.product}>
                    <div className={styled.imgContainer}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styled.productInfo}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <div>{item.price}</div>
                    </div>

                    <div className={styled.amount}>
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
                    <div className={styled.icon}>
                      <BsTrash
                        onClick={() => removeFromCartHandler(item.product)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className={styled.box}>
                <div>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>
                  <hr />$
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>
                <hr />
                <div>
                  <button
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default CartPage
