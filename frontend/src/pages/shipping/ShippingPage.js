import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../actions/cartAtions'
import Checkout from '../../components/checkout/Checkout'
import { useNavigate } from 'react-router-dom'
const ShippingPage = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <>
      <Checkout step1 step2 />
      <form onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Enter address'
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter city'
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter postal code'
          value={postalCode}
          required
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter country'
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type='submit'>continue</button>
        {/* falta agregar redirect al register si no hay cuenta */}
      </form>
    </>
  )
}
export default ShippingPage
