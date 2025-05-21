// import React from 'react'
import Dashboard from './Components/Dashboard'
// import Tags from "./Components/Tags";
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import FragmentsForm from './Components/FragmentForm'
const StyledHead = styled.header`
  display: flex;
  color: black;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`

const a = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px'
}
function App() {
  return (
    <>
      <StyledHead>
        <strong>
          <Link to={'/'} style={{ fontSize: '45px', textDecoration: 'none', color: 'white' }}>
            Code Wallet &nbsp;
          </Link>
        </strong>
        <strong>
          <Link to={'/'} style={a}>
            Fragments &nbsp;
          </Link>
        </strong>
        <strong>
          <Link to={'#'} style={a}>
            Tags &nbsp;
          </Link>
        </strong>
        <strong>
          <Link to={'#'} style={a}>
            Info &nbsp;
          </Link>
        </strong>
      </StyledHead>

      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/Fragment/:id" element={<FragmentsForm />} />
        {/* <Route path="/Tags" element={<Tags />} /> */}
      </Routes>
    </>
  )
}

export default App
