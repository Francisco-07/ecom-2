import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../../actions/userActions'
import { Link, useNavigate } from 'react-router-dom'
import styled from './adminPages.module.css'
import Spinner from '../../components/spinner/Spinner'
import Error from '../../components/error/Error'
import { ImCross } from 'react-icons/im'
import { BsCheckLg } from 'react-icons/bs'

const UserListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [dispatch, successDelete, navigate, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        <h1>Users</h1>
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
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.isAdmin ? <BsCheckLg /> : <ImCross />}</td>
                    <td>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button>edit</button>
                      </Link>
                      <button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        delete
                      </button>
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

export default UserListPage
