import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import styled from './slider.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../../actions/productActions'
import { Link } from 'react-router-dom'
import Spinner from '../spinner/Spinner'

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const dispatch = useDispatch()

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : products.length - 1)
    } else {
      setSlideIndex(slideIndex < products.length - 1 ? slideIndex + 1 : 0)
    }
  }

  const productTopRated = useSelector((state) => state.productTopRated)
  const { products, loading } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slideIndex >= products.length - 1) {
        setSlideIndex(0)
      } else {
        setSlideIndex(slideIndex + 1)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [slideIndex, products.length])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styled.test}>
          <h1 className={styled.center}>MEJORES PRODUCTOS</h1>
          <div className={styled.container}>
            <div
              direction='left'
              onClick={() => handleClick('left')}
              style={{ left: '10px' }}
              className={styled.arrow}
            >
              <AiOutlineArrowLeft />
            </div>
            <div
              style={{ transform: `translateX(${slideIndex * -100}vw)` }}
              className={styled.wrapper}
            >
              {products.map((product, i) => (
                <div key={i} className={styled.slide}>
                  <Link to={`/product/${product._id}`} className={styled.name}>
                    <div className={styled.slideContainer}>
                      <img src={product.image} alt={product.description} />
                      <h2>{product.name}</h2>
                      <h3>${product.price}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div
              direction='right'
              onClick={() => handleClick('right')}
              style={{ right: '10px' }}
              className={styled.arrow}
            >
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Slider
