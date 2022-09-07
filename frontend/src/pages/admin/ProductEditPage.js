import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import styled from './adminPages.module.css'
import Spinner from '../../components/spinner/Spinner'
import Error from '../../components/error/Error'

const ProductEditScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInSock)
        setDescription(product.description)
      }
    }
  }, [dispatch, navigate, id, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
          <button>Volver</button>
        </Link>
        <div>
          <h1>Editar Producto</h1>
          {loadingUpdate && <Spinner />}
          {errorUpdate && <Error>{errorUpdate}</Error>}
          {loading ? (
            <Spinner />
          ) : error ? (
            <Error>{error}</Error>
          ) : (
            <form onSubmit={submitHandler}>
              <div controlId='name'>
                <div>Nombre</div>
                <input
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <div controlId='price'>
                <div>Precio</div>
                <input
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>

              <div controlId='image'>
                <div>Imagen</div>
                <input
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input
                  id='image-file'
                  label='Choose File'
                  type='file'
                  onChange={uploadFileHandler}
                ></input>
                {uploading && <Spinner />}
              </div>

              <div controlId='brand'>
                <div>Marca</div>
                <input
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </div>

              <div controlId='countInStock'>
                <div>Stock</div>
                <input
                  type='number'
                  placeholder='Enter countInStock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </div>

              <div controlId='category'>
                <div>Categoria</div>
                <input
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </div>

              <div controlId='description'>
                <div>Descripcion</div>
                <input
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>

              <button type='submit'>Actualizar</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductEditScreen
