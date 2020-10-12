import React, { Component } from 'react'

import JoinLobbyForm from '../components/JoinLobbyForm'

export class JoinLobbyFormContainer extends Component {

  state={
    name: "",
    code: ""
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <JoinLobbyForm formData={ this.state } onChange={ this.handleOnChange } />
      </div>
    )
  }
}

export default JoinLobbyFormContainer
