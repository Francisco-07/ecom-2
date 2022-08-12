import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../../constants/orderConstants'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../../actions/orderActions'

const OrderScreen = () => {
  const { id } = useParams()

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, id, successPay, successDeliver, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(id, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <div />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <div>
        <div>
          <div>
            <div>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <div>Delivered on {order.deliveredAt}</div>
              ) : (
                <div>Not Delivered</div>
              )}
            </div>

            <div>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <div>Paid on {order.paidAt}</div>
              ) : (
                <div>Not Paid</div>
              )}
            </div>

            <div>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <div>Order is empty</div>
              ) : (
                <div>
                  {order.orderItems.map((item, index) => (
                    <div key={index}>
                      <div>
                        <div>
                          <img src={item.image} alt={item.name} fluid rounded />
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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
                  <div>${order.itemsPrice}</div>
                </div>
              </div>
              <div>
                <div>
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </div>
              </div>
              <div>
                <div>
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </div>
              </div>
              <div>
                <div>
                  <div>Total</div>
                  <div>${order.totalPrice}</div>
                </div>
              </div>
              {!order.isPaid && (
                <div>
                  {loadingPay && <div>loading</div>}
                  {!sdkReady ? (
                    <div>loading</div>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
              {loadingDeliver && <div>loading</div>}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  type='button'
                  className='btn btn-block'
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderScreen
