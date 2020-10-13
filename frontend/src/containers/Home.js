import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

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
    if(this.state.homeForm === 1){
      return 
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

    if(this.props.redirect){
      return <Redirect to={this.props.redirect} />
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
    redirect: state.redirect
  }
}

export default connect(mapStateToProps)(Home)
