import React from 'react'

const CanvasOptions = ({ erasing, onClick, size, sizeSlider, colorChange, clear }) => {
  const btn = erasing ? "Draw" : "Erase"

  const colorDivStyle = {
    border: "1px solid black",
    width: "20px",
    height: "20px",
    margin: "5px",
    display: "inline-block"
  }

  const colors = ["black","red","blue","green","purple","yellow","orange","brown"]

  const genColorPallete = colors => colors.map( (color,i) => {
    return (<div onClick={ colorChange } style={ {...colorDivStyle, backgroundColor: color} } name={ color } key={i}></div>)
  })

  return (
    <div>
      <button onClick={ clear }>Reset</button>
      <button onClick={ onClick }>{ btn }</button>
      <input onChange={ sizeSlider } type={"range"} min={1} max={10} value={ size } />
      { genColorPallete(colors) }
    </div>
  )
}

export default CanvasOptions
