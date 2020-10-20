import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreatePlayerForm = ({ fields, errors, onChange, onSubmit }) => {
  return (
    <Form onSubmit={ onSubmit } style={{margin: "20px 0px"}}>
      <h3>Create Your Player</h3>
      <Form.Row className="justify-content-md-center">
        <Form.Group>
          <Form.Label>Player Name</Form.Label>
          <Form.Control type="text" name="name" placeholder='Enter Name' value={ fields.name } onChange={ onChange } autoComplete="off" />
          { errors.name && <Form.Text className="text-danger">{ errors.name }</Form.Text>}
        </Form.Group>
      </Form.Row>

      <Button variant="primary" type="submit">Create</Button>
    </Form>
  )
}

export default CreatePlayerForm
