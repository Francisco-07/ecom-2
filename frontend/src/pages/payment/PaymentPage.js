import Checkout from '../../components/checkout/Checkout'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { savePaymentMethod } from '../../actions/cartAtions'
import { useNavigate } from 'react-router-dom'
import styled from './paymentPage.module.css'

const PaymentPage = () => {
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
      <div className={styled.container}>
        <div className={styled.wrapper}>
          <h1>Metodo de pago</h1>
          <h3>Elija el metodo</h3>
          <form onSubmit={submitHandler}>
            <div className={styled.box}>
              <div className={styled.payment}>
                <input
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                paypal
              </div>
              <div>
                <button type='submit'>Continuar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default PaymentPage
