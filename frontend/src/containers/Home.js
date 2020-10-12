import React, { Component } from 'react'

import About from '../components/About'

export class Home extends Component {

  state={
    homeForm: 0
  }

  handleOpenFormButton = (option) => {
    this.setState({
      homeForm: option
    })
  }

  render() {
    return (
      <div>
        <button onClick={()=>this.handleOpenFormButton(1)}>Create Lobby</button>
        <button onClick={()=>this.handleOpenFormButton(2)}>Join Lobby</button>
        <About />
      </div>
    )
  }
}

export default Home
