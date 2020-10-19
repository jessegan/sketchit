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
    // Load existing canvas
    fetch(`http://localhost:8000/lobbies/${this.props.lobbyCode}/canvas`)
      .then(resp=>resp.json())
      .then(data=>{
        if(data.data_url){
          const img = new Image()
          img.src = data.data_url
          img.onload = () => this.canvasref.current.getContext('2d').drawImage(img,0,0)  
        }
      })

    // Subscribe to canvas channel
    CableApp.canvas = CableApp.cable.subscriptions.create({
      channel: "CanvasChannel",
      lobby_code: this.props.lobbyCode
    }, {
      received: ({ type, data }) => {
        switch(type){
          case("draw"):
            this.draw(this.canvasref.current.getContext('2d'),data.prev[0],data.prev[1],data.cur[0],data.cur[1],data.color,data.size)
            break
          case("clear"):
            this.clear()
            break
          default:
            console.log("No action")
        }
      }
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
      const color = (this.state.erasing ? "white" : this.state.color)
      const size = (this.state.erasing ? 3*this.state.size : this.state.size)

      let config = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ type: "draw", data: {prev: this.state.prev, cur: [x,y], color: color, size: size} })
      }
    
      fetch(`http://localhost:8000/lobbies/${this.props.lobbyCode}/canvas/draw`, config)

      // Save canvas on db
      const canvasData = this.canvasref.current.toDataURL('image/png',0.1)

      let updateConfig = {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ data: { canvasData }})
      }

      fetch(`http://localhost:8000/lobbies/${this.props.lobbyCode}/canvas`, updateConfig)

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

  handleClear = e => {
    e.preventDefault()

    this.clear()

    // Broadcast the clear
    let config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ type: "clear" })
    }
  
    fetch(`http://localhost:8000/lobbies/${this.props.lobbyCode}/canvas/draw`, config)
  }

  draw = (ctx,x1,y1,x2,y2,color=null,size=null) => {
    color = color || (this.state.erasing ? "white" : this.state.color)
    size = size || (this.state.erasing ? 3*this.state.size : this.state.size)

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = size
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  }

  clear = () => {
    const canvas = this.canvasref.current

    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
  }

  render() {
    return (
      <div>
        <canvas ref={ this.canvasref } width={1000} height={500} style={{border: "1px solid"}} onMouseDown={ this.handleMouseDown } onMouseUp={ this.handleMouseUp } onMouseMove={ this.handleMouseMove } ></canvas>
        <CanvasOptions erasing={ this.state.erasing } onClick={ this.handleEraseButton } size={ this.state.size } sizeSlider={ this.handleSizeSlider } colorChange={ this.handleColorChange } clear={ this.handleClear } />
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
