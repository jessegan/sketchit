import React, { Component } from 'react'

import About from '../components/About'
import JoinLobbyFormContainer from './JoinLobbyFormContainer'

export class Home extends Component {

  state={
    homeForm: 0
  }

  handleOpenFormButton = (option) => {
    this.setState({
      homeForm: option
    })
  }

  genHomeForm = () => {
    if(this.state.homeForm == 1){
      return 
    } else if (this.state.homeForm == 2){
      return <JoinLobbyFormContainer />
    }
  }

  render() {
    return (
      <div>
        <button onClick={()=>this.handleOpenFormButton(1)}>Create Lobby</button>
        <button onClick={()=>this.handleOpenFormButton(2)}>Join Lobby</button>
        { this.genHomeForm() }
        <About />
      </div>
    )
  }
}

export default Home
