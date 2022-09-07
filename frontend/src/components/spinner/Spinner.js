import styled from './spinner.module.css'

const Spinner = () => {
  return (
    <div className={styled.container}>
      <div className={styled.ring}></div>
    </div>
  )
}
export default Spinner
