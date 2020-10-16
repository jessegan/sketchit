import React, { Component } from 'react'
import { connect } from 'react-redux'

import Canvas from '../components/Canvas'

export class CanvasContainer extends Component {
  render() {
    return (
      <div>
        <Canvas />
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
