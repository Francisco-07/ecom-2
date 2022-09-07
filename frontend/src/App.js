import HomePage from './pages/home/HomePage'
import ProductPage from './pages/product/ProductPage'
import CartPage from './pages/cart/CartPage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import ProfilePage from './pages/profile/ProfilePage'
import ShippingPage from './pages/shipping/ShippingPage'
import PaymentPage from './pages/payment/PaymentPage'
import OrderDetailsPage from './pages/order-details/PlaceOrderPage'
import OrderPage from './pages/order/OrderPage'
import UserListPage from './pages/admin/UserListPage'
import UserEditPage from './pages/admin/UserEditPage'
import ProductEditPage from './pages/admin/ProductEditPage'
import ProductListPage from './pages/admin/ProductListPage'
import OrderListPage from './pages/admin/OrderListPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/shipping' element={<ShippingPage />} />
        <Route path='/order' element={<OrderDetailsPage />} />
        <Route path='/order/:id' element={<OrderPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/admin/userlist' element={<UserListPage />} />
        <Route path='/admin/user/:id/edit' element={<UserEditPage />} />

        {['/admin/productlist', '/admin/productlist/:pageNumber'].map(
          (path, index) => {
            return (
              <Route path={path} element={<ProductListPage />} key={index} />
            )
          }
        )}

        <Route path='/admin/product/:id/edit' element={<ProductEditPage />} />
        <Route path='/admin/orderlist' element={<OrderListPage />} />
        {['/cart', '/cart/:id'].map((path, index) => {
          return <Route path={path} element={<CartPage />} key={index} />
        })}
        {/* {['/', '/search/:keyword'].map((path, index) => {
          return <Route path={path} element={<HomePage />} key={index} />
        })} */}

        <Route path='/' element={<HomePage />} exact />
        <Route path='/search/:keyword' element={<HomePage />} exact />
        <Route path='/page/:pageNumber' element={<HomePage />} exact />
        <Route
          path='/search/:keyword/page/:pageNumber'
          element={<HomePage />}
          exact
        />
      </Routes>
    </Router>
  )
}

export default App
