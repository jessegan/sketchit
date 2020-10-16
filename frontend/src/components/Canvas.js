import React, { useRef, useEffect } from 'react'

const Canvas = ({ mouseDown, mouseUp, mouseMove }) => {

  const handleMouseMove = e => {
    const ctx = e.target.getContext('2d')

    mouseMove(e,ctx)
  }

  return (
    <div>
      <canvas width={1000} height={500} style={{border: "1px solid"}} onMouseDown={ mouseDown } onMouseUp={ mouseUp } onMouseMove={ handleMouseMove } ></canvas>
    </div>
  )
}

export default Canvas
