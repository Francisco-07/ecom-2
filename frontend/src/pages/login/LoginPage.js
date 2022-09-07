import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import styled from './loginPage.module.css'
import Error from '../../components/error/Error'

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo } = userLogin

  // const redirect = location.pathname ? location.pathname.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [history, userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className={styled.container}>
      <form onSubmit={submitHandler} className={styled.form}>
        <h1>INGRESAR</h1>
        {error && <Error error={error}>{error}</Error>}
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
        <button type='submit'>Ingresar</button>
        <div>
          No tenes una cuenta?{' '}
          <Link to='/register'>
            <strong>Registrate</strong>
          </Link>
        </div>
        {/* falta agregar redirect al register si no hay cuenta */}
      </form>
    </div>
  )
}
export default LoginPage
