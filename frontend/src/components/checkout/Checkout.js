import styled from './checkout.module.css'
import { Link } from 'react-router-dom'

const Checkout = ({ step1, step2, step3, step4 }) => {
  return (
    <div className={styled.container}>
      <div>
        {step1 ? (
          <Link to='/register' className={styled.active}>
            Ingresar
          </Link>
        ) : (
          <div className={styled.disabled}>Ingresar</div>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to='/shipping' className={styled.active}>
            Envio
          </Link>
        ) : (
          <div className={styled.disabled}>Envio</div>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to='/payment' className={styled.active}>
            Metodo de pago
          </Link>
        ) : (
          <div className={styled.disabled}>Metodo de pago</div>
        )}
      </div>
      <div>
        {step4 ? (
          <Link to='/order' className={styled.active}>
            Orden
          </Link>
        ) : (
          <div className={styled.disabled}>Orden</div>
        )}
      </div>
    </div>
  )
}
export default Checkout
