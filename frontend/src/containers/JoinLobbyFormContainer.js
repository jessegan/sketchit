import React, { Component } from 'react'
import { connect } from 'react-redux'

import JoinLobbyForm from '../components/JoinLobbyForm'

import { joinLobby } from '../actions/lobbyActions'

export class JoinLobbyFormContainer extends Component {

  state={
    fields: {    
      name: "",
      code: ""
    },
    errors: {}
  }

  handleOnChange = e => {
    let newVal = e.target.value

    if(e.target.name === "code"){
      if(e.target.value.length <= 6){
        newVal = newVal.toUpperCase()
      } else {
        return
      }
    }
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

  handleSubmit = (e) => {
    e.preventDefault()

    if(this.validateForm()){
      this.props.joinLobby(this.state.fields)
    }
  }

  render() {
    return (
      <div>
        <JoinLobbyForm fields={ this.state.fields } errors={ this.state.errors } onChange={ this.handleOnChange } submit={ this.handleSubmit } />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    joinLobby: (formData) => dispatch(joinLobby(formData))
  }
}

export default connect(null,mapDispatchToProps)(JoinLobbyFormContainer)
