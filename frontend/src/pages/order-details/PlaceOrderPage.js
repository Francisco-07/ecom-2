import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkout from '../../components/checkout/Checkout'
import { Link } from 'react-router-dom'
import { createOrder } from '../../actions/orderActions'
import { USER_DETAILS_RESET } from '../../constants/userConstants'
import { ORDER_CREATE_RESET } from '../../constants/orderConstants'
import { useNavigate } from 'react-router-dom'
import styled from './placeOrderPage.module.css'

const OrderDetailsPage = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <>
      <Checkout step1 step2 step3 step4 />
      <div className={styled.container}>
        <div className={styled.wrapper}>
          <div className={styled.infoContainer}>
            <div>
              <h2>Envio</h2>
              <p>
                <strong>Direccion: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </div>
            <hr />
            <div>
              <h2>Metodo de Pago</h2>
              <strong>Metodo: </strong>
              {cart.paymentMethod}
            </div>
            <hr />
            <div>
              {cart.cartItems.length === 0 ? (
                <div>Tu carrito esta vacio</div>
              ) : (
                <div>
                  {cart.cartItems.map((item, index) => (
                    <div key={index}>
                      <div className={styled.itemContainer}>
                        <div className={styled.imgContainer}>
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styled.orderContainer}>
            <div className={styled.orderBox}>
              <div>
                <div>
                  <h2>Resumen de Orden</h2>
                </div>
                <hr />
                <div>
                  <div>Productos ${cart.itemsPrice}</div>
                </div>
                <hr />
                <div>
                  <div>Envio ${cart.shippingPrice}</div>
                </div>
                <hr />
                <div>
                  <div>Impuestos ${cart.taxPrice}</div>
                </div>
                <hr />
                <div>
                  <div>Total ${cart.totalPrice}</div>
                </div>
                <hr />
                <div>
                  <button
                    type='button'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Pagar Orden
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default OrderDetailsPage
