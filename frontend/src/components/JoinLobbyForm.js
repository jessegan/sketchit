import React from 'react'

const JoinLobbyForm = ({ submit }) => {
  return (
    <form onSubmit={ submit }>
      <input type='text' name='name' />
      <input type='text' name='code' placeholder='Enter Code' />
      <input type='submit' value='Join' />
    </form>
  )
}

export default JoinLobbyForm
