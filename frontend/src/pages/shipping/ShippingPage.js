import { useState } from 'react'
import styled from './shippingPage.module.css'
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
      <div className={styled.container}>
        <form onSubmit={submitHandler}>
          <label>Pais</label>
          <input
            type='text'
            placeholder='Pais'
            value={country}
            name='country'
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <label>Ciudad</label>
          <input
            type='text'
            placeholder='Ciudad'
            value={city}
            name='city'
            required
            onChange={(e) => setCity(e.target.value)}
          />

          <label>Codigo Postal</label>
          <input
            type='text'
            placeholder='Codigo Postal'
            value={postalCode}
            name='postalCode'
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <label>Direccion</label>
          <input
            type='text'
            placeholder='Direccion'
            value={address}
            name='address'
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <div>
            <button type='submit'>Continuar</button>
          </div>
          {/* falta agregar redirect al register si no hay cuenta */}
        </form>
      </div>
    </>
  )
}
export default ShippingPage
