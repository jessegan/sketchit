import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CableApp } from '../index'

import Canvas from '../components/Canvas'

export class CanvasContainer extends Component {

  state={
    prev: [],
    isDrawing: false,
    lastPositionTime: null
  }

  componentDidMount(){
    // Subscribe to canvas channel
    CableApp.canvas = CableApp.cable.subscriptions.create({
      channel: "CanvasChannel",
      lobby_code: this.props.lobbyCode
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
      isDrawing: false
    })
  }

  handleMouseMove = (e,ctx) => {
    const d = new Date()

    if(this.state.isDrawing && d.getTime() - this.state.lastPositionTime > 10){
      // get new coordinates
      const rect = e.target.getBoundingClientRect()

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Draw line
      this.draw(ctx, this.state.prev[0],this.state.prev[1],x,y)

      // Broadcast to canvas channel

      // set prev to current position
      this.setState({
        prev: [x,y]
      })
    }
  }

  draw = (ctx,x1,y1,x2,y2) => {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }

  render() {
    return (
      <div>
        <Canvas mouseDown={ this.handleMouseDown } mouseUp={ this.handleMouseUp } mouseMove={ this.handleMouseMove } />
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
