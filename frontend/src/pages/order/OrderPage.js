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
import styled from './orderPage.module.css'
import Spinner from '../../components/spinner/Spinner'
import Error from '../../components/error/Error'

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

    if (!order || successPay || successDeliver || order._id !== id) {
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
    <Spinner />
  ) : error ? (
    <Error>{error}</Error>
  ) : (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        <div className={orderDetails}>
          <h2>Orden {order._id}</h2>
          <div>
            <div>
              <div>
                <div>
                  <h2>Envio</h2>
                  <p>
                    <strong>Nombre: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Direccion: </strong>
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <div>Se envio el {order.deliveredAt}</div>
                  ) : (
                    <div>No enviado</div>
                  )}
                </div>
                <hr />
                <div>
                  <h2>Metodo de Pago</h2>
                  <p>
                    <strong>Metodo: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <div>Pago el {order.paidAt}</div>
                  ) : (
                    <div>No Pago</div>
                  )}
                </div>
                <hr />
                <div>
                  <h2>Productos de la Orden</h2>
                  {order.orderItems.length === 0 ? (
                    <div>No hay productos</div>
                  ) : (
                    <div>
                      {order.orderItems.map((item, index) => (
                        <>
                          <div key={index} className={styled.itemContainer}>
                            <div className={styled.imgContainer}>
                              <img
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </div>
                            <div>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </div>
                          </div>
                          <hr />
                        </>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styled.orderSummary}>
            <div>
              <div>
                <h2>Resumen de Orden</h2>
              </div>
              <hr />
              <div>
                Productos: <strong>${order.itemsPrice}</strong>
              </div>
              <hr />
              <div>
                Envio: <strong>${order.shippingPrice}</strong>
              </div>
              <hr />
              <div>
                Impuestos: <strong>${order.taxPrice}</strong>
              </div>
              <hr />
              <div>
                Total: <strong>${order.totalPrice}</strong>
              </div>
              <hr />
              {!order.isPaid && (
                <div>
                  {loadingPay && <Spinner />}
                  {!sdkReady ? (
                    <Spinner />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
              {loadingDeliver && <Spinner />}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  type='button'
                  className='btn btn-block'
                  onClick={deliverHandler}
                >
                  Marcar como Enviada
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderScreen
