import React, { Component } from 'react'
import { CableApp } from '../index'
import { fetchCanvas, updateCanvas, saveCanvas } from '../actions/canvasActions'

import CanvasOptions from '../components/CanvasOptions'

/**
 * Canvas Container
 * 
 * Controls all Canvas options and actions with Canvas Component. Also handles connecting to CanvasChannel through ActionCable.
 */
export class CanvasContainer extends Component {

  // creates ref to Canvas
  canvasref = React.createRef(null)

  // Initial state
  state={
    prev: [],
    color: "black",
    size: 1,
    erasing: false,
    isDrawing: false,
    lastPositionTime: null
  }

  /**
   * Fetches lobby, subscribes to canvas channel.
   */
  componentDidMount(){
    // Load existing canvas and draws canvas data if exists
    fetchCanvas(this.props.lobbyCode)
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

  /**
   * Handles mouseDown event and tracks position of mouse.
   * 
   * @param {Event} e 
   */
  handleMouseDown = e => {
    e.preventDefault()

    // set prev to current coords and set isDrawing to true if it's left click
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

  /**
   * Handles mouseUp event by reseting state.
   * 
   * @param {Event} e 
   */
  handleMouseUp = e => {
    e.preventDefault()

    this.setState({
      prev:[],
      isDrawing: false,
      lastPositionTime: null
    })
  }

  /**
   * Handle mouseMove event by drawing to canvas based on mouse position.
   * 
   * @param {Event} e 
   */
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

      const updateData = {
        code: this.props.lobbyCode,
        type: "draw",
        drawData: {prev: this.state.prev, cur: [x,y], color: color, size: size}
      }

      updateCanvas(updateData)

      // Save canvas on db
      const canvasData = this.canvasref.current.toDataURL('image/png',0.1)

      const saveData = {
        code: this.props.lobbyCode,
        canvasData
      }

      saveCanvas(saveData)

      // set prev to current position
      this.setState({
        prev: [x,y],
        lastPositionTime: d.getTime()
      })
    }
  }

  /**
   * Handles click of erase button by toggling erasing state
   * 
   * @param {Event} e 
   */
  handleEraseButton = e => {
    e.preventDefault()

    this.setState({
      erasing: !this.state.erasing
    })
  }

  /** 
   * Handles the changing value of brush size range input by setting this.state.size to target value
   * 
   * @param {Event} e
  */
  handleSizeSlider = e => {
    e.preventDefault() 

    this.setState({
      size: e.target.value
    })
  }

  /**
   * Handles pressing color options by changing state color
   * 
   * @param {Event} e 
   */
  handleColorChange = e => {
    e.preventDefault()

    this.setState({
      color: e.target.getAttribute("name")
    })
  }

  /**
   * Handles click of clear button by clearing canvas
   * 
   * @param {Event} e 
   */
  handleClear = e => {
    e.preventDefault()

    this.clear()

    // Broadcast the clear
    const updateData = {
      code: this.props.lobbyCode,
      type: "clear"
    }

    updateCanvas(updateData)
  }

  /**
   * Draws onto Canvas based on given settings
   * 
   * @param {Context} ctx Context of Canvas
   * @param {Integer} x1 prev x coords
   * @param {Integer} y1 prev y coords
   * @param {Integer} x2 cur x coords
   * @param {Integer} y2 cur y coords
   * @param {String} color draw color
   * @param {Integer} size draw size
   */
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

  /**
   * Clears the canvas
   */
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


export default CanvasContainer
