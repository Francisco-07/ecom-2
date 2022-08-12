import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { useParams, useNavigate } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

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
    <>
      <Link to='/admin/userlist'>Go Back</Link>
      <div>
        <h1>Edit User</h1>
        {loadingUpdate && <div>loading</div>}
        {errorUpdate && <div>{errorUpdate}</div>}
        {loading ? (
          <div>loading</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <form onSubmit={submitHandler}>
            <div>
              <div>Name</div>
              <input
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div>
              <div>Email Address</div>
              <input
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div>
              <input
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>

            <button type='submit'>Update</button>
          </form>
        )}
      </div>
    </>
  )
}
export default UserEditPage
