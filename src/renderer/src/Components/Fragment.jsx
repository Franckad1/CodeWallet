import { useState } from 'react'
import dbProvider from '../Providers/dbProvider'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
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

const Fragment = ({ fragment }) => {
  const navigate = useNavigate()
  const [openCode, setOpenCode] = useState(false)
  const toggle = () => {
    openCode === false ? setOpenCode(true) : setOpenCode(false)
  }
  const deleteData = async (event) => {
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
            <StyledDiv>
              <h1 style={{ fontSize: '30px', color: '#333333' }}>{fragment.data.fragment}</h1>
            </StyledDiv>
          </Link>
          {openCode && <div className="code-appear">{fragment.data.code}</div>}
        </div>

        <button className="code-button" onClick={toggle}>
          <img
            className="code-image"
            src={`./assets/${openCode ? 'Opened' : 'Cover'}.png`}
            alt=""
          />
        </button>

        <button className="remove-fragment" onClick={deleteData}>
          x
        </button>
      </div>
    </>
  )
}
export default Fragment
