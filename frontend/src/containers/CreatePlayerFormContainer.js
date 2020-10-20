import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPlayer } from '../actions/playerActions'

import CreatePlayerForm from '../components/CreatePlayerForm'

/**
 * CreatePlayerForm Container
 * 
 * Handles events for CreatePlayerForm Component
 */
export class CreatePlayerFormContainer extends Component {

  state = {
    fields: {
      name: ""
    },
    errors: {}
  }

  /**
   * Handles changes to input on forms. Also validates before updating state.
   * 
   * @param {Event} e 
   */
  handleOnChange = e => {
    let newVal = e.target.value

    // Prevents name from being longer than 20 characters
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
   * Validates state.fields
   * 
   * @return {Boolean} form inputs are valid or not
   */
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

  /**
   * Handles submitting form.
   * 
   * @param {Event} e 
   */
  handleOnSubmit = e => {
    e.preventDefault()

    if(this.validateForm()){
      this.props.createPlayer({code: this.props.code, ...this.state.fields})
    }
  }

  render() {
    return (
      <div>
        <CreatePlayerForm fields={this.state.fields} errors={this.state.errors} onChange={this.handleOnChange} onSubmit={this.handleOnSubmit} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPlayer: (playerData) => dispatch(createPlayer(playerData))
  }
}

export default connect(null,mapDispatchToProps)(CreatePlayerFormContainer)
