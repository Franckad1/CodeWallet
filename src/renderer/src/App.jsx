// import React from 'react'
import Dashboard from './Components/Dashboard'
// import Tags from "./Components/Tags";
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import FragmentsForm from './Components/FragmentForm'
import Tags from './Components/Tags'
import { useEffect, useState } from 'react'

const ContainerDiv = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0px;
  height: 0px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  transition: 1s ease;
`

const StyledDiv = styled.div`
  display: flex;
  margin-right: 20px;
  padding: 3.3333333333px;
  width: 40px;
  min-height: 40px;
  background-color: #333333;
  border-radius: 40px;
  cursor: pointer;
  transition: 0.4s ease;

  &:before {
    content: '🌙';
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%;
    transition: 0.4s ease;
  }

  &.on {
    background-color: #9a48d0;
  }

  &.on:before {
    content: '☀️';
    transform: rotate(180deg);
    text-align: left;
  }
`

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
  const [theme, setTheme] = useState(true)
  const changingMode = () => {
    setTheme(!theme)
    const newTheme = theme === false ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
  }
  useEffect(() => {
    function initTheme() {
      const storedPreference = localStorage.getItem('theme')
      setTheme(storedPreference === 'light' ? true : false)
    }
    initTheme()
  }, [])
  console.log(localStorage.getItem('theme'))

  return (
    <div id="container" className={theme ? '' : 'dark'}>
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
          <Link to={'/Tags'} style={a}>
            Tags &nbsp;
          </Link>
        </strong>
        <strong>
          <Link to={'#'} style={a}>
            Info &nbsp;
          </Link>
        </strong>
        <ContainerDiv>
          <StyledDiv className={theme && 'on'} onClick={changingMode} />
        </ContainerDiv>
      </StyledHead>
      <Routes>
        <Route index element={<Dashboard classType={theme ? '' : 'dark'} />} />
        <Route path="/Fragment/:id" element={<FragmentsForm classType={theme ? '' : 'dark'} />} />
        <Route path="/Tags" element={<Tags classType={theme ? '' : 'dark'} />} />
      </Routes>
    </div>
  )
}

export default App
