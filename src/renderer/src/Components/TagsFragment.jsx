import { collection, getDocs, writeBatch } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input'
import { db } from '../Config/FirebaseConifg'
import dbProvider from '../Providers/dbProvider'
import PropTypes from 'prop-types'

const TagsView = ({ tagsContainer, classType }) => {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  let currentId = null
  const suggestions = []
  console.log(tagsContainer)

  useEffect(() => {
    console.log(tags)
  }, [tags])

  useEffect(() => {
    console.log('setting tags from tagsContainer')
    setTags([...tagsContainer])
  }, [tagsContainer])

  const handleDelete = async (index) => {
    console.log('Deleting tag at index:', index)
    const tagToDelete = tags[index]
    console.log('Tag to delete:', tagToDelete)
    if (!tagToDelete) {
      console.error('No tag found at index:', index)
      return
    }
    await dbProvider.deleteData('tags', tagToDelete.id)
    if (currentId === tagToDelete.id) {
      console.log('Current ID matches tag to delete, resetting currentId')
      currentId = null
    }
    setTags(tags.filter((_, i) => i !== index))
  }

  const onTagUpdate = async (index, updated) => {
    const updatedTags = [...tags]
    updated.id = currentId || updated.id // Ensure the ID is set correctly
    updatedTags.splice(index, 1, updated)
    console.log(updated.id)
    console.log(currentId)
    await dbProvider.updateData({ name: updated }, 'tags', currentId)
    setTags(updatedTags)
  }

  const handleAddition = async (tag) => {
    const docId = await dbProvider.addData({ name: tag }, 'tags')
    const newTagsArray = [...tags, { data: { name: tag }, id: docId }]
    setTags(newTagsArray)
  }

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    setTags(newTags)
  }

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked')
    const tag = tags[index]
    currentId = tag.id
    console.log('Current ID:', currentId)
  }

  const wipeTags = async (collPath) => {
    const colRef = collection(db, 'tags')
    const snap = await getDocs(colRef)
    const batch = writeBatch(db)

    snap.docs.forEach((docSnap) => batch.delete(docSnap.ref))
    await batch.commit()
  }

  const handlePurge = async () => {
    if (!window.confirm('Supprimer TOUTE la collection tags ?')) return
    setLoading(true)
    try {
      await wipeTags()
      alert('Collection vidée ✅')
      window.location.reload()
    } catch (e) {
      console.error(e)
      alert('Erreur pendant la suppression')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div>
        <ReactTags
          tags={tags.map((tag) => ({
            id: tag.data?.name?.id.toUpperCase() || tag.id.toUpperCase(),
            text: tag.data?.name?.text.toUpperCase() || tag.text.toUpperCase(),
            className: tag.data?.name?.className || tag.className
          }))}
          suggestions={suggestions}
          separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          onTagUpdate={onTagUpdate}
          inputFieldPosition="bottom"
          editable
          maxTags={100}
          className="tag-input"
          id={classType}
        />
      </div>

      <div
        style={{
          color: 'lightcoral',
          marginTop: '50px',
          border: 'none',
          padding: '10px'
        }}
      >
        <button
          style={{
            color: '#333333',
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none'
          }}
          id={classType}
          onClick={handlePurge}
          disabled={loading}
        >
          {loading ? 'Suppression...' : 'Supprimer tous les tags'}
        </button>
      </div>
    </div>
  )
}
TagsView.propTypes = {
  tagsContainer: PropTypes.array,
  classType: PropTypes.string
}
export default TagsView
