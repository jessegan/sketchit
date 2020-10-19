import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createLobbyFromForm } from '../actions/lobbyActions'

import CreatePlayerForm from '../components/CreatePlayerForm'

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

  validateForm = () => {
    const fields = this.state.fields

    if(fields.name === ""){
      this.setState({
        errors: {
          name: "Required field"
        }
      })

      return false
    }

    return true
  }

  handleOnSubmit = e => {
    e.preventDefault()

    if(this.validateForm()){
      // Create Lobby and Create player
      this.props.createLobbyFromForm({
        lobbyData: {},
        playerData: this.state.fields
      })
    }
  }

  render() {
    return (
      <div>
        <CreatePlayerForm fields={ this.state.fields } errors={ this.state.errors } onChange={ this.handleOnChange } onSubmit={ this.handleOnSubmit } />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    createLobbyFromForm: (formData) => dispatch(createLobbyFromForm(formData))
  }
}

export default connect(null,mapDispatchToProps)(CreateLobbyFormContainer)
