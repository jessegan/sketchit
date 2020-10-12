import React from 'react'

const JoinLobbyForm = ({ formData, onChange, submit }) => {
  return (
    <form onSubmit={ submit }>
      Player Name
      <br></br>
      <input type='text' name='name' placeholder='Enter Name' value={ formData.name } onChange={ onChange } />
      <br></br>
      Lobby Code
      <br></br>
      <input type='text' name='code' placeholder='Enter Code' value={ formData.code } onChange={ onChange } />
      <br></br>
      <input type='submit' value='Join' />
    </form>
  )
}

export default JoinLobbyForm
