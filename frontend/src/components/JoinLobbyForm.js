import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

/**
 * JoinLobbyForm Component
 * 
 * Renders form for user to join a lobby.
 */
const JoinLobbyForm = ({ fields, errors, onChange, onSubmit }) => {
  return (
    <Form onSubmit={ onSubmit } style={{margin: "20px 0px"}}>
      <h3>Join a Lobby</h3>

      <Form.Row className="justify-content-md-center">
        <Form.Group>
          <Form.Label>Player Name</Form.Label>
          <Form.Control type="text" name="name" placeholder='Enter Name' value={ fields.name } onChange={ onChange } autoComplete="off" />
          { errors.name && <Form.Text className="text-danger">{ errors.name }</Form.Text>}
        </Form.Group>
      </Form.Row>

      <Form.Row className="justify-content-md-center">
        <Form.Group>
          <Form.Label>Lobby Code</Form.Label>
          <Form.Control type="text" name="code" placeholder='Enter Code' value={ fields.code } onChange={ onChange } autoComplete="off" />
          { errors.code && <Form.Text className="text-danger">{ errors.code }</Form.Text>}
        </Form.Group>
      </Form.Row>

      <Button variant="primary" type="submit">Join</Button>
    </Form>

  )
}

export default JoinLobbyForm
