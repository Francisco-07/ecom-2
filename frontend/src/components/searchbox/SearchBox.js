import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from './searchBox.module.css'

const SearchBox = ({ closeMenu }) => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler} inline className={styled.form}>
        <input
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Buscar Productos...'
        ></input>
        <button className={styled.btn} type='submit' onClick={closeMenu}>
          Buscar
        </button>
      </form>
    </div>
  )
}

export default SearchBox
