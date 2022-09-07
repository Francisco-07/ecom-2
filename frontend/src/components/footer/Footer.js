import styled from './footer.module.css'
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className={styled.container}>
      <div className={styled.icon}>
        <AiOutlineInstagram />
      </div>
      <div className={styled.icon}>
        <AiOutlineTwitter />
      </div>
      <div className={styled.icon}>
        <AiOutlineLinkedin />
      </div>
      <div className={styled.icon}>
        <AiOutlineFacebook />
      </div>
    </div>
  )
}
export default Footer
