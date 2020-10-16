import React from 'react'

const CanvasOptions = ({ erasing, onClick, size, sizeSlider }) => {
  const btn = erasing ? "Draw" : "Erase"
  return (
    <div>
      <button onClick={ onClick }>{ btn }</button>
      <input onChange={ sizeSlider } type={"range"} min={1} max={10} value={ size } />
    </div>
  )
}

export default CanvasOptions
