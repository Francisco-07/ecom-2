import { useState, useEffect } from 'react'
import styled from './error.module.css'

const Error = ({ children }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  if (!show) {
    return null
  }
  if (show) {
    return <div className={styled.error}>{children}</div>
  }
}

export default Error
