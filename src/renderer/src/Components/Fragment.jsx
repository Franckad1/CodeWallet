import { useState } from 'react'
import dbProvider from '../Providers/dbProvider'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Cover from '../assets/Cover.png'
import Opened from '../assets/Opened.png'
const StyledDiv = styled.div`
  background-color: white;
  color: white;
  padding: 15px 20px;
  margin: 10px;
  border-radius: 20px;
  margin-bottom: 15px;
`
const a = {
  color: '#333333',
  textDecoration: 'none'
}

const Fragment = ({ fragment,classType }) => {  
  const [openCode, setOpenCode] = useState(false)
  const toggle = () => {
    openCode === false ? setOpenCode(true) : setOpenCode(false)
  }
  
  const deleteFragment = async (event) => {
    event.preventDefault()
    if (window.confirm('Do you want to delete this fragment')) {
      await dbProvider.deleteData('fragments', fragment.id)
      window.location.reload()
    }
  }
  return (
    <>
      <div className="fragment-container">
        <br />
        <div className="styled-div-wrapper">
          <Link to={`/Fragment/${fragment.id}`} style={a}>
            <StyledDiv id={classType}>
              <h1 style={{ fontSize: '30px', color: '#333333' }}>{fragment.data.title}</h1>
            </StyledDiv>
          </Link>
          {openCode && <div className={classType===''?"code-appear":"code-appear-dark"}>{fragment.data.code}</div>}
        </div>

        <button className={classType===''?"code-button":"code-button-dark"} onClick={toggle}>
          <img
            className="code-image"
            src={openCode ? Opened : Cover}
            alt=""
          />
        </button>

        <button className="remove-fragment" onClick={deleteFragment}>
          x
        </button>
      </div>
    </>
  )
}
Fragment.propTypes = {
  fragment: PropTypes.object,
  classType: PropTypes.string
}
export default Fragment
