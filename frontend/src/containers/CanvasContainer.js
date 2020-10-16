import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CableApp } from '../index'

import Canvas from '../components/Canvas'

export class CanvasContainer extends Component {

  state={
    prev: [],
    isDrawing: false
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

      this.setState({
        prev: [x,y],
        isDrawing: true
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
    if(this.state.isDrawing){
      // get new coordinates
      const rect = e.target.getBoundingClientRect()

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Draw line
      this.draw(ctx, this.state.prev[0],this.state.prev[1],x,y)

      // Broadcast to canvas channel

      // set prev to current position
    }
  }

  draw = (ctx,x1,y1,x2,y2) => {
    console.log(`${x1},${y1} | ${x2},${y2}`)
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
