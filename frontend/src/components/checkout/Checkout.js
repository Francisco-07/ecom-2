const Checkout = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <div>{step1 ? <div>Sign In</div> : <div disabled>Sign In</div>}</div>
      <div>{step3 ? <div>Shipping</div> : <div disabled>Shipping</div>}</div>
      <div>{step2 ? <div>Payment</div> : <div disabled>Payment</div>}</div>
      <div>
        {step4 ? <div>Place Order</div> : <div disabled>Place Order</div>}
      </div>
    </>
  )
}
export default Checkout
