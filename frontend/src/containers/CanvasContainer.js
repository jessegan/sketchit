import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CableApp } from '../index'

import Canvas from '../components/Canvas'

export class CanvasContainer extends Component {

  state={
    prev: [],
    next: [],
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
      next: [],
      isDrawing: false
    })
  }

  render() {
    return (
      <div>
        <Canvas mouseDown={ this.handleMouseDown } mouseUp={ this.handleMouseUp } />
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
