import PropTypes from 'prop-types'
import React from 'react'
const TagFragment = (tag) => {
  return (
    <>
      <div className="tags-container">
            <React.Fragment >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px'
                }}
              >
                <input type="text" className="tag-input" value={tag.name} />
                <button className="remove-tag">-</button>
              </div>
            </React.Fragment> 
      </div>
    </>
  )
}
TagFragment.propTypes={
  tag:PropTypes.object
}
export default TagFragment
