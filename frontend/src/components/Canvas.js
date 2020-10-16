import React, { useRef, useEffect } from 'react'

const Canvas = ({ mouseDown, mouseUp }) => {

  const canvasref = useRef(null)

  useEffect( () => {
    const canvas = canvasref.current
    const context = canvas.getContext('2d')
  })

  return (
    <div>
      <canvas ref={canvasref} width={1000} height={500} style={{border: "1px solid"}} onMouseDown={ mouseDown } ></canvas>
    </div>
  )
}

export default Canvas
