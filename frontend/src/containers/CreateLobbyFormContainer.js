import React, { Component } from 'react'

import CreateLobbyForm from '../components/CreateLobbyForm'

export class CreateLobbyFormContainer extends Component {

  state = {
    fields: {
      name: ""
    },
    errors: {}
  }

  render() {
    return (
      <div>
        <CreateLobbyForm fields={ this.state.fields } />
      </div>
    )
  }
}

export default CreateLobbyFormContainer
