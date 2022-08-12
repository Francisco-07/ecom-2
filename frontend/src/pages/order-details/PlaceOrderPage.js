import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkout from '../../components/checkout/Checkout'
import { Link } from 'react-router-dom'
import { createOrder } from '../../actions/orderActions'
import { useNavigate } from 'react-router-dom'

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
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
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
      <div>
        <h2>Shipping</h2>
        <p>
          <strong>Address:</strong>
          {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
          {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
        </p>
      </div>
      <div>
        <h2>Payment Method</h2>
        <strong>Method: </strong>
        {cart.paymentMethod}
      </div>
      <div>
        {cart.cartItems.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <div>
            {cart.cartItems.map((item, index) => (
              <div key={index}>
                <div>
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <div>
          <div>
            <div>
              <h2>Order Summary</h2>
            </div>
            <div>
              <div>
                <div>Items</div>
                <div>${cart.itemsPrice}</div>
              </div>
            </div>
            <div>
              <div>
                <div>Shipping</div>
                <div>${cart.shippingPrice}</div>
              </div>
            </div>
            <div>
              <div>
                <div>Tax</div>
                <div>${cart.taxPrice}</div>
              </div>
            </div>
            <div>
              <div>
                <div>Total</div>
                <div>${cart.totalPrice}</div>
              </div>
            </div>
            <div>
              <button
                type='button'
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default OrderDetailsPage
