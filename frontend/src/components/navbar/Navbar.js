import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { logout } from '../../actions/userActions'
import styled from './navbar.module.css'
import { Link } from 'react-router-dom'
import SearchBox from '../searchbox/SearchBox'
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { FaUsersCog } from 'react-icons/fa'
import { RiShutDownLine, RiCloseLine } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const closeMenu = () => {
    setIsOpen(false)
  }

  const logoutHandler = () => {
    dispatch(logout())
    setIsOpen(false)
  }
  return (
    <div className={styled.container}>
      <div className={styled.brand}>
        <Link to='/'>shop</Link>
      </div>
      <div className={styled.items} style={{ left: `${isOpen ? 0 : -100}%` }}>
        <div>
          <SearchBox closeMenu={closeMenu} />
        </div>
        <div className={styled.links}>
          {userInfo && userInfo.isAdmin && (
            <>
              <Link to='/admin/productlist' onClick={closeMenu}>
                Productos
              </Link>
              <Link to='/admin/orderlist' onClick={closeMenu}>
                Ordenes
              </Link>
              <Link to='/admin/userlist' onClick={closeMenu}>
                <FaUsersCog />
              </Link>
            </>
          )}
          <div>
            <Link to='/cart' onClick={closeMenu}>
              <AiOutlineShoppingCart />
            </Link>
          </div>
          {userInfo ? (
            <>
              <Link to='/profile' onClick={closeMenu}>
                <AiOutlineUser />
              </Link>
              <Link to='/' onClick={logoutHandler}>
                <RiShutDownLine />
              </Link>
            </>
          ) : (
            <>
              <Link to='/login' onClick={closeMenu}>
                Ingresar
              </Link>
              <Link to='/register' onClick={closeMenu}>
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={styled.menuBtn} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <RiCloseLine /> : <GiHamburgerMenu />}
      </div>
    </div>
  )
}

export default Navbar
