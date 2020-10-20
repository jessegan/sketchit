import React, { Component } from 'react'
import { connect } from 'react-redux'

import JoinLobbyForm from '../components/JoinLobbyForm'

import { joinLobbyFromForm } from '../actions/lobbyActions'

/**
 * JoinLobbyForm Container
 * 
 * Handles events with JoinLobbyForm Component.
 */
export class JoinLobbyFormContainer extends Component {

  state={
    fields: {    
      name: "",
      code: ""
    },
    errors: {}
  }

  /**
   * Handles changes in inputs on form
   * 
   * @param {Event} e 
   */
  handleOnChange = e => {
    let newVal = e.target.value

    //Prevents code input from being long than 6 and uppercases input
    if(e.target.name === "code"){
      if(e.target.value.length <= 6){
        newVal = newVal.toUpperCase()
      } else {
        return
      }
    }
    // Prevents name input from being longer than 20 characters
    else if(e.target.name === "name"){
      if(e.target.value.length > 20){
        return
      }
    }

    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: newVal
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: ""
      }
    })

  }

  /**
   * Validates state.fields and sets errors if invalid
   */
  validateForm = () => {
    const fields = this.state.fields
    const errors = {}
    let passed = true

    if(fields.name === ""){
      errors.name = "Required field"
      passed = false
    }

    if(fields.code === ""){
      errors.code = "Required field"
      passed = false
    } else if(fields.code.length < 6){
      errors.code = "Code must be 6-characters"
      passed = false
    }

    if(!passed){
      this.setState({
        errors: errors
      })
      return false
    }

    return true
  }

  /**
   * Handles submit event on form
   * 
   * @param {Event} e 
   */
  handleSubmit = (e) => {
    e.preventDefault()

    if(this.validateForm()){
      this.props.joinLobbyFromForm(this.state.fields)
    }
  }

  render() {
    return (
      <div>
        <JoinLobbyForm fields={ this.state.fields } errors={ this.state.errors } onChange={ this.handleOnChange } onSubmit={ this.handleSubmit } />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    joinLobbyFromForm: (formData) => dispatch(joinLobbyFromForm(formData))
  }
}

export default connect(null,mapDispatchToProps)(JoinLobbyFormContainer)
