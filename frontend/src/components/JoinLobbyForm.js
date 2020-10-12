import React from 'react'

const JoinLobbyForm = ({ submit }) => {
  return (
    <form onSubmit={ submit }>
      Player Name
      <br></br>
      <input type='text' name='name' placeholder='Enter Name' />
      <br></br>
      Lobby Code
      <br></br>
      <input type='text' name='code' placeholder='Enter Code' />
      <br></br>
      <input type='submit' value='Join' />
    </form>
  )
}

export default JoinLobbyForm
