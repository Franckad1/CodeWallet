import dbProvider from '../Providers/dbProvider'
import { useState, useEffect } from 'react'
import TagFragment from './TagFragment'
const Tags = ({classType}) => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    const getAllData = async () => {
      const list = await dbProvider.getAllData('tags')
      console.log('Data récupérée ')
      setTags(list) // On met à jour le state
    }
    getAllData()
  }, [])

  return (
    <>
    <h2 style={{color:'white'}}>Tags:</h2>
      {tags.map((tag) => (
        <TagFragment tags={tag.data} key={tag.id} />
      ))}
       <button className="add-tags" id={classType}>
          +
       </button>
    </>
  )
}
export default Tags
