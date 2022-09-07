import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'
import styled from './registerPage.module.css'
import Error from '../../components/error/Error'

const RegisterPage = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [history, userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Los passwords deben ser iguales')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <div className={styled.container}>
      <form onSubmit={submitHandler} className={styled.form}>
        <h1>registarse</h1>
        {message && <Error>{message}</Error>}
        {error && <Error>{error}</Error>}
        <label for='name'>Nombre</label>
        <input
          type='name'
          placeholder='Nombre'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label for='email'>Email</label>
        <input
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label for='confirmPassword'>Confirmar Password</label>
        <input
          name='confirmPassword'
          type='password'
          placeholder='Confirmar password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type='submit'>Registrarse</button>
        {/* falta agregar redirect al register si no hay cuenta */}
      </form>
    </div>
  )
}
export default RegisterPage
