import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import styled from './navbar.module.css'
import { Link } from 'react-router-dom'
import SearchBox from '../searchbox/SearchBox'

const Navbar = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <div className={styled.container}>
      <Link to='/'>
        <div>shop</div>
      </Link>
      <SearchBox />
      <div className={styled.links}>
        <Link to='/cart'>cart</Link>
        {userInfo ? (
          <>
            <Link to='/profile'>{userInfo.name}</Link>
            <p onClick={logoutHandler}>Logout</p>
          </>
        ) : (
          <>
            <Link to='/login'>Sign In</Link>
            <Link to='/register'>register</Link>
          </>
        )}
        {userInfo && userInfo.isAdmin && (
          <>
            <Link to='/admin/userlist'>Users</Link>
            <Link to='/admin/productlist'>Products</Link>
            <Link to='/admin/orderlist'>Orders</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
