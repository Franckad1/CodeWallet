import { useState, useEffect } from 'react'
import styled from 'styled-components'
import dbProvider from '../Providers/dbProvider'
import { Link } from 'react-router-dom'
import Fragment from './Fragment'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
  position: absolute; /* Positionnement absolu */
  top: 60px;
  right: 20px; /* 20px depuis la droite */
  padding: 7px;
  margin: 5px;
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

const Dashbord = ({ classType }) => {
  const [fragments, setFragments] = useState([])
  useEffect(() => {
    const getAllData = async () => {
      const list = await dbProvider.getAllData('fragments')
      console.log('Data récupérée ')
      setFragments(list) // On met à jour le state
    }
    getAllData()
  }, [])

  return (
    <>
      <Link to={`/Fragment/${0}`} style={a}>
        <StyledButton id={classType}>New</StyledButton>
      </Link>
      <br />
      {fragments.map((fragment) => (
        <Fragment fragment={fragment} key={fragment.id} classType={classType} />
      ))}
    </>
  )
}
Dashbord.propTypes = {
  classType: PropTypes.string
}
export default Dashbord
