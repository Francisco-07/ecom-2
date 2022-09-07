import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { listMyOrders } from '../../actions/orderActions'
import styled from './profilePage.module.css'
import Error from '../../components/error/Error'
import Spinner from '../../components/spinner/Spinner'
import { ImCross } from 'react-icons/im'

const ProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, userInfo, user, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Los passwords deben ser iguales')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        {message && <Error>{message}</Error>}
        {error && <Error>{error}</Error>}
        {success && <div>Profile Updated</div>}
        <form onSubmit={submitHandler} className={styled.form}>
          <label>Nombre</label>
          <input
            type='name'
            placeholder='Nombre'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            name='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirmar Password</label>
          <input
            name='confirmPassword'
            type='password'
            placeholder='Confirmar password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type='submit'>Confirmar</button>
        </form>
        {loadingOrders ? (
          <Spinner />
        ) : errorOrders ? (
          <Error>{errorOrders}</Error>
        ) : (
          <div className={styled.tableContainer}>
            <table className={styled.table}>
              <thead>
                <tr>
                  <th>ID</th>
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
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
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
export default ProfilePage
