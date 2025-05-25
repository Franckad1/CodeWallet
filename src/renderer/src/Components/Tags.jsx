import dbProvider from '../Providers/dbProvider'
import { useState, useEffect } from 'react'
import TagsView from './TagsFragment'
import PropTypes from 'prop-types'

const Tags = ({ classType }) => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    const getAllData = async () => {
      const list = await dbProvider.getAllData('tags')
      console.log('Data récupérée ')
      console.log('list recup', list)
      setTags([...list]) // On met à jour le state
    }
    getAllData()
  }, [])

  return (
    <>
      <h2 style={{ color: 'white' }}>Tags:</h2>
      <TagsView tagsContainer={tags} classType={classType} />
    </>
  )
}
Tags.propTypes = {
  classType: PropTypes.string
}
export default Tags
