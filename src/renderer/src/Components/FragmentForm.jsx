import { useState, useEffect } from 'react'
import dbProvider from '../Providers/dbProvider'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  margin: 0;
`

const FragmentsForm = ({classType}) => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState(['']) // ← tableau des tags
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getAllData = async () => {
      const list = await dbProvider.getAllData('fragments')
      const fragment = list.reduce(
        (result, value) => {
          if (id === value.id) result = value
          return result
        },
        { id: 0, data: { title: '', code: '', tags: [''] } }
      )
      setName(fragment.data.title)
      setContent(fragment.data.code)
      setTags(fragment.data.tags || [''])
    }

    getAllData()
  }, [id])

  const addTagField = (e) => {
    e.preventDefault()
    setTags([...tags, ''])
  }

  const handleTagChange = (index, value) => {
    const newTags = [...tags]
    newTags[index] = value.toUpperCase()
    setTags(newTags)
  }
const syncTagsWithGeneralCollection = async (tagList) => {
  const existingTags = await dbProvider.getAllData('tags')
  const existingTagNames = existingTags.map(tag => tag.data.name.text.toUpperCase())

  for (const tag of tagList) {
    const upperTag = tag.toUpperCase()
    if (!existingTagNames.includes(upperTag)) {
      await dbProvider.addData({ name: {className:'',id:upperTag,text: upperTag} }, 'tags')
    }
  }
}

  const removeTagField = (index) => {
    const newTags = tags.filter((_, i) => i !== index)
    setTags(newTags.length > 0 ? newTags : [''])
  }

  const addData = async (event) => {
    event.preventDefault()
    if (name === '') {
      toast.error('Fill the title')
      return
    } else if (content === '') {
      toast.error('Fill the Content')
      return
    } else {
      await syncTagsWithGeneralCollection(tags)
      await dbProvider.updateData({ title: name, code: content, tags:tags }, 'fragments', id)
      navigate('/')
    }
  }
  

  const modifyData = async (event) => {
    event.preventDefault()
    if (name === '') {
      toast.error('Fill the title')
      return
    } else if (content === '') {
      toast.error('Fill the Content')
      return
    }else{
      await syncTagsWithGeneralCollection(tags)
      await dbProvider.setData({ title: name, code: content, tags:tags }, 'fragments', id)
      navigate('/')
    }
    
    
  }

  return (
    <StyledDiv>
      <form className="form-container" onSubmit={Number(id) === 0 ? addData : modifyData}>
        <label htmlFor="fragment-name" style={{ fontSize: '20px' }}>
          Fragment Name :
        </label>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          id={classType}
        />

        <label htmlFor="code" style={{ fontSize: '20px' }}>
          Code :
        </label>
        <textarea
          className="textarea-field"
          id={classType}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="tags-container">
          <label>Tags:</label>
          {tags.map((tag, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px'
              }}
            >
              <input
                type="text"
                className="tag-input"
                id={classType}
                value={tag.toUpperCase()}
                onChange={(e) => handleTagChange(index, e.target.value)}
              />
              <button
                className="remove-tag"
                onClick={(e) => {
                  e.preventDefault()
                  removeTagField(index)
                }}
              >
                -
              </button>
            </div>
          ))}
          <button className="add-tag" onClick={addTagField}>
            +
          </button>
        </div>

        <button className="submit-button" id={classType} style={{ fontSize: '15px'}}>
          {Number(id) === 0 ? 'Ajouter' : 'Modifier'}
        </button>
      </form>
      <ToastContainer />
    </StyledDiv>
  )
}

export default FragmentsForm
