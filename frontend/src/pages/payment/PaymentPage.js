import Checkout from '../../components/checkout/Checkout'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../actions/cartAtions'
import { useNavigate } from 'react-router-dom'

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  // if (!shippingAddress) {
  //   history.push('/shipping')
  // }
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/order')
  }
  return (
    <>
      <Checkout step1 step2 step3 />
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <input
          type='radio'
          label='PayPal or Credit Card'
          id='PayPal'
          name='paymentMethod'
          value='PayPal'
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}
        />

        {/* <input
          type='radio'
          label='Stripe'
          id='Stripe'
          name='paymentMethod'
          value='Stripe'
          onChange={(e) => setPaymentMethod(e.target.value)}
        /> */}

        <button type='submit'>Continue</button>
      </form>
    </>
  )
}
export default PaymentPage
