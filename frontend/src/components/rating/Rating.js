import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from 'react-icons/io'
import styled from './rating.module.css'
const Rating = ({ value, text, color }) => {
  return (
    <div className={styled.container}>
      {value >= 1 ? (
        <IoIosStar />
      ) : value >= 0.5 ? (
        <IoIosStarHalf />
      ) : (
        <IoIosStarOutline />
      )}

      {value >= 2 ? (
        <IoIosStar />
      ) : value >= 1.5 ? (
        <IoIosStarHalf />
      ) : (
        <IoIosStarOutline />
      )}

      {value >= 3 ? (
        <IoIosStar />
      ) : value >= 2.5 ? (
        <IoIosStarHalf />
      ) : (
        <IoIosStarOutline />
      )}

      {value >= 4 ? (
        <IoIosStar />
      ) : value >= 3.5 ? (
        <IoIosStarHalf />
      ) : (
        <IoIosStarOutline />
      )}

      {value >= 5 ? (
        <IoIosStar />
      ) : value >= 4.5 ? (
        <IoIosStarHalf />
      ) : (
        <IoIosStarOutline />
      )}

      <span>{text && text}</span>
    </div>
  )
}

export default Rating
