import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../actions/orderActions'
import styled from './adminPages.module.css'
import Spinner from '../../components/spinner/Spinner'
import Error from '../../components/error/Error'
import { ImCross } from 'react-icons/im'

const OrderListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        <h1>Ordenes</h1>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Error>{error}</Error>
        ) : (
          <div className={styled.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USUARIO</th>
                  <th>FECHA</th>
                  <th>TOTAL</th>
                  <th>PAGO</th>
                  <th>ENVIADO</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <ImCross />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <ImCross />
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button>Detalles</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
export default OrderListPage
