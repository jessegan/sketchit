import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createLobbyFromForm } from '../actions/lobbyActions'

import CreatePlayerForm from '../components/CreatePlayerForm'

/**
 * CreateLobbyForm Container
 * 
 * Handles events for CreateLobbyForm Component
 */
export class CreateLobbyFormContainer extends Component {

  state = {
    fields: {
      name: ""
    },
    errors: {}
  }

  /**
   * Handles changes in form inputs by updating state.fields. Also, validates input before setting state.
   * 
   * @param {Event} e 
   */
  handleOnChange = e => {
    let newVal = e.target.value

    // Prevent input from being longer than 20 characters
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

  /**
   * Validates state.fields before submitting. If errors, add to state.errors.
   */
  validateForm = () => {
    const fields = this.state.fields

    // check if name is empty
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

  /**
   * Handles submitting of form. Validates form before invoking createLobbyFromForm action.
   * 
   * @param {Event} e 
   */
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
