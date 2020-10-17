import React, { Component } from 'react'
import { connect } from 'react-redux'

import About from '../components/About'
import JoinLobbyFormContainer from './JoinLobbyFormContainer'
import CreateLobbyFormContainer from './CreateLobbyFormContainer'
import { Redirect } from 'react-router-dom'

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
    if(this.state.homeForm === 1){
      return <CreateLobbyFormContainer />
    } else if (this.state.homeForm === 2){
      return <JoinLobbyFormContainer />
    }
  }

  render() {
    if(this.props.joining){
      return (
        <h6>Joining Lobby...</h6>  
      )
    }

    if(this.props.lobbyJoined){
      return (<Redirect push to={`/${this.props.lobbyCode}`} />)
    }

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

function mapStateToProps(state){
  return { 
    joining: state.joining,
    lobbyJoined: state.lobbyJoined,
    lobbyCode: state.lobbyCode
  }
}

export default connect(mapStateToProps)(Home)
