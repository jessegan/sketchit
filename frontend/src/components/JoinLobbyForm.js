import React from 'react'

const JoinLobbyForm = ({ fields, onChange, submit }) => {
  return (
    <form onSubmit={ submit }>
      Player Name
      <br></br>
      <input type='text' name='name' placeholder='Enter Name' value={ fields.name } onChange={ onChange } />
      <br></br>
      Lobby Code
      <br></br>
      <input type='text' name='code' placeholder='Enter Code' value={ fields.code } onChange={ onChange } />
      <br></br>
      <input type='submit' value='Join' />
    </form>
  )
}

export default JoinLobbyForm
