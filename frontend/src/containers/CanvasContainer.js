import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CableApp } from '../index'

import CanvasOptions from '../components/CanvasOptions'

export class CanvasContainer extends Component {

  canvasref = React.createRef(null)

  state={
    prev: [],
    color: "black",
    size: 1,
    erasing: false,
    isDrawing: false,
    lastPositionTime: null
  }

  componentDidMount(){
    // Subscribe to canvas channel
    CableApp.canvas = CableApp.cable.subscriptions.create({
      channel: "CanvasChannel",
      lobby_code: this.props.lobbyCode
    }, {
      received: ({prev,cur}) => this.draw(this.canvasref.current.getContext('2d'),prev[0],prev[1],cur[0],cur[1])
    })

  }

  handleMouseDown = e => {
    e.preventDefault()

    // set prev to current coords and set isDrawing to true
    if(e.button === 0){
      const rect = e.target.getBoundingClientRect()

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const d = new Date()

      this.setState({
        prev: [x,y],
        isDrawing: true,
        lastPositionTime: d.getTime()
      })
    }
  }

  handleMouseUp = e => {
    e.preventDefault()

    this.setState({
      prev:[],
      isDrawing: false,
      lastPositionTime: null
    })
  }

  handleMouseMove = (e) => {
    const d = new Date()

    if(this.state.isDrawing && d.getTime() - this.state.lastPositionTime > 10){
      // get new coordinates
      const rect = e.target.getBoundingClientRect()

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Draw line
      this.draw(this.canvasref.current.getContext('2d'), this.state.prev[0],this.state.prev[1],x,y)

      // Broadcast to canvas channel with fetch request
      let config = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ prev: this.state.prev, cur: [x,y] })
      }
    
      fetch(`http://localhost:8000/lobbies/${this.props.lobbyCode}/draw`, config)

      // set prev to current position
      this.setState({
        prev: [x,y],
        lastPositionTime: d.getTime()
      })
    }
  }

  handleEraseButton = e => {
    e.preventDefault()

    this.setState({
      erasing: !this.state.erasing
    })
  }

  /** 
   * Handles the changing value of brush size range input by setting this.state.size to target value
  */
  handleSizeSlider = e => {
    e.preventDefault() 

    this.setState({
      size: e.target.value
    })
  }

  handleColorChange = e => {
    e.preventDefault()

    this.setState({
      color: e.target.getAttribute("name")
    })
  }

  draw = (ctx,x1,y1,x2,y2) => {
    ctx.beginPath()
    ctx.strokeStyle = this.state.erasing ? "white" : this.state.color
    ctx.lineWidth = this.state.erasing ? 3*this.state.size : this.state.size
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  }

  render() {
    return (
      <div>
        <canvas ref={ this.canvasref } width={1000} height={500} style={{border: "1px solid"}} onMouseDown={ this.handleMouseDown } onMouseUp={ this.handleMouseUp } onMouseMove={ this.handleMouseMove } ></canvas>
        <CanvasOptions erasing={ this.state.erasing } onClick={ this.handleEraseButton } size={ this.state.size } sizeSlider={ this.handleSizeSlider } colorChange={ this.handleColorChange } />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    lobbyCode: state.lobbyCode
  }
}

export default connect(mapStateToProps)(CanvasContainer)
