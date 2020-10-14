import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createLobby } from '../actions/lobbyActions'

import CreateLobbyForm from '../components/CreateLobbyForm'

export class CreateLobbyFormContainer extends Component {

  state = {
    fields: {
      name: ""
    },
    errors: {}
  }

  handleOnChange = e => {
    let newVal = e.target.value

    if(e.target.name === "name"){
      if(newVal.length > 20){
        return
      }
    }

    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: newVal
      } 
    })
  }

  render() {
    return (
      <div>
        <CreateLobbyForm fields={ this.state.fields } onChange={ this.handleOnChange } />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    createLobby: (name) => dispatch(createLobby(name))
  }
}

export default connect(mapDispatchToProps)(CreateLobbyFormContainer)
