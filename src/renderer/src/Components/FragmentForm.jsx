import { useState, useEffect } from 'react'
import dbProvider from '../Providers/dbProvider'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { html } from '@codemirror/lang-html'
import { php } from '@codemirror/lang-php'
import { css } from '@codemirror/lang-css'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  margin: 0;
`

const FragmentsForm = ({ classType }) => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([''])
  const [existingTags, setExistingTags] = useState([''])
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
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
      const existingTags = await dbProvider.getAllData('tags')
      const existingTagNames = existingTags.map((tag) => tag.data.name.text.toUpperCase())
      setExistingTags(existingTagNames)
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
    const existingTagNames = existingTags.map((tag) => tag.data.name.text.toUpperCase())

    for (const tag of tagList) {
      const upperTag = tag.toUpperCase()
      if (!existingTagNames.includes(upperTag)) {
        await dbProvider.addData({ name: { className: '', id: upperTag, text: upperTag } }, 'tags')
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
      setLoading(true)
      await syncTagsWithGeneralCollection(tags)
      await dbProvider.addData({ title: name, code: content, tags: tags }, 'fragments')
      setLoading(false)
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
    } else {
      setLoading(true)
      await syncTagsWithGeneralCollection(tags)
      await dbProvider.setData({ title: name, code: content, tags: tags }, 'fragments', id)
      setLoading(false)
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
        <CodeMirror
          value={content}
          height="200px"
          extensions={[javascript({ jsx: true }), html(), css(), python(), php()]}
          theme={dracula}
          onChange={(e) => setContent(e)}
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
                list="Tags"
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

          <datalist id="Tags">
            {existingTags.map((tag) => (
              <option value={tag} key={tag} />
            ))}
          </datalist>

          <button className="add-tag" onClick={addTagField}>
            +
          </button>
        </div>

        <button
          type="submit"
          className="submit-button"
          id={classType}
          style={{ fontSize: '15px' }}
          disabled={loading}
        >
          {Number(id) === 0 ? 'Ajouter' : 'Modifier'}
        </button>
      </form>
      <ToastContainer />
    </StyledDiv>
  )
}
FragmentsForm.propTypes = {
  classType: PropTypes.string
}
export default FragmentsForm
