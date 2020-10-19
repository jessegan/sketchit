import React from 'react'

const JoinLobbyForm = ({ fields, errors, onChange, submit }) => {
  return (
    <form onSubmit={ submit }>
      Player Name
      <br></br>
      <input type='text' name='name' placeholder='Enter Name' value={ fields.name } onChange={ onChange } />
      <br></br>
      { errors ? (<span style={{color: "red"}}>{ errors.name }<br></br></span>) : (<></>)}
      Lobby Code
      <br></br>
      <input type='text' name='code' placeholder='Enter Code' value={ fields.code } onChange={ onChange } />
      <br></br>
      { errors ? (<span style={{color: "red"}}>{ errors.code }<br></br></span>) : (<></>)}
      <input type='submit' value='Join' />
    </form>
  )
}

export default JoinLobbyForm
