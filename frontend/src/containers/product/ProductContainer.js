import Product from '../../components/product/Product'
import styled from './productContainer.module.css'

const ProductContainer = ({ products }) => {
  return (
    <>
      <div className={styled.container}>
        <div className={styled.wrapper}>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
export default ProductContainer
