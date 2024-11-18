import React from 'react'

const Animation = () => {
  return (
    <div className="area">
      <ul className="circles">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </div>
  )
}

export default Animation
