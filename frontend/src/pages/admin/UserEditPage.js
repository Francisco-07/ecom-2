import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { useParams, useNavigate } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import styled from './adminPages.module.css'
import Spinner from '../../components/spinner/Spinner'
import Error from '../../components/error/Error'

const UserEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, navigate, id, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: id, name, email, isAdmin }))
  }
  return (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        <Link to='/admin/userlist'>
          <button>Volver</button>
        </Link>
        <div>
          <h1>Editar Usuario</h1>
          {loadingUpdate && <Spinner />}
          {errorUpdate && <Error>{errorUpdate}</Error>}
          {loading ? (
            <Spinner />
          ) : error ? (
            <Error>{error}</Error>
          ) : (
            <form onSubmit={submitHandler}>
              <div>
                <div>Nombre</div>
                <input
                  type='name'
                  placeholder='Nombre'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <div>
                <div>Email</div>
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div>
                <label>Permisos de Admin</label>
                <input
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></input>
              </div>

              <button type='submit'>Actualizar</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
export default UserEditPage
