import React from 'react'

const CanvasOptions = ({ erasing, onClick }) => {
  const btn = erasing ? "Draw" : "Erase"
  return (
    <div>
      <button onClick={ onClick }>{ btn }</button>
    </div>
  )
}

export default CanvasOptions
