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

  handleOnSubmit = e => {
    e.preventDefault()

    this.props.createLobby(this.state.fields)
  }

  render() {
    return (
      <div>
        <CreateLobbyForm fields={ this.state.fields } errors={ this.state.errors } onChange={ this.handleOnChange } onSubmit={ this.handleOnSubmit } />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    createLobby: (formData) => dispatch(createLobby(formData))
  }
}

export default connect(null,mapDispatchToProps)(CreateLobbyFormContainer)
