import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import dbProvider from '../Providers/dbProvider'
import { Link } from 'react-router-dom'
import Fragment from './Fragment'

const StyledButton = styled.button`
  position: absolute; /* Positionnement absolu */
  top: 60px;
  right: 20px; /* 20px depuis la droite */
  padding: 10px;
  background-color: white;
  color: black;
  border-radius: 10px;
  width: 5rem;
  font-size: 13px;
  border: none;
  cursor: pointer;
`
const a = {
  color: '#333333',
  textDecoration: 'none'
}

const Dashbord = () => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    const getAllData = async () => {
      const list = await dbProvider.getAllData('fragments')
      console.log('Data récupérée ')
      setLists(list) // On met à jour le state
    }

    getAllData()
  }, [])

  return (
    <>
      <Link to={`/Fragment/${0}`} style={a}>
        <StyledButton>New</StyledButton>
      </Link>
      <br />
      {lists.map((e) => (
        <Fragment fragment={e} key={e.id} />
      ))}
    </>
  )
}

export default Dashbord
