import React from 'react'

const CreateLobbyForm = ({ fields, onChange }) => {
  return (
    <form>
      Player Name
      <br></br>
      <input type='text' name='name' placeholder='Enter Name' value={ fields.name } onChange={ onChange } />
      <br></br>
      <input type='submit' value='Create' />
    </form>
  )
}

export default CreateLobbyForm
