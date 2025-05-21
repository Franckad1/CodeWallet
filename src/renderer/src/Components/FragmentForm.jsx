import React, { useState, useEffect } from 'react'
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

const FragmentsForm = () => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState(['']) // ← tableau des tags
  const navigate = useNavigate()
  const { id } = useParams()
  const affiche = Number(id) === 0 ? 'Ajouter' : 'Modifier'
  let freezeButton=''
  useEffect(() => {
    const getAllData = async () => {
      const list = await dbProvider.getAllData('fragments')
      const fragment = list.reduce(
        (result, value) => {
          if (id === value.id) {
            result = value
          }
          return result
        },
        { id: 0, data: { fragment: '', code: '', tags: [''] } }
      )
      setName(fragment.data.fragment)
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
    newTags[index] = value
    setTags(newTags)
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
      await dbProvider.addData({ fragment: name, code: content }, 'fragments')
      freezeButton='none';
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
      await dbProvider.setData({ fragment: name, code: content, tags }, 'fragments', id)
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
        />

        <label htmlFor="code" style={{ fontSize: '20px' }}>
          Code :
        </label>
        <textarea
          className="textarea-field"
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
                value={tag}
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

        <button className="submit-button" style={{ fontSize: '15px',pointerEvents: freezeButton }}>
          {affiche}
        </button>
      </form>
      <ToastContainer />
    </StyledDiv>
  )
}

export default FragmentsForm
