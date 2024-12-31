import React from 'react'

const Sort = ({handleChange}) => {
  return (
    <div>
      <select onChange={handleChange} className='select rounded-sm bg-blue-900/70 text-white'>
         <option value="">Sort By Date</option>
         <option value="latest">Latest Event</option>
         <option value="oldest">Oldest Event</option>
      </select>
    </div>
  )
}

export default Sort
