import React from 'react'

import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/**
 * CanvasOptions component
 * 
 * Renders UI for selecting drawing options on canvas
 */

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

  /**
   * Returns div elements for list of colors used in color options
   * 
   * @param {Array} colors 
   */
  const genColorPallete = colors => colors.map( (color,i) => {
    return (<div onClick={ colorChange } style={ {...colorDivStyle, backgroundColor: color} } name={ color } key={i}></div>)
  })

  return (
    <Row className='justify-content-md-center'>
      <Col xs lg="3">
        <Button variant="outline-secondary" size="sm" onClick={ clear }>Reset</Button>
        <Button variant="outline-secondary" size="sm" onClick={ onClick }>{ btn }</Button>
      </Col >
      <Col xs lg="3">
        <input onChange={ sizeSlider } type={"range"} min={1} max={10} value={ size } />
      </Col>
      <Col xs lg="3">
        { genColorPallete(colors) }
      </Col>
    </Row>
  )
}

export default CanvasOptions
