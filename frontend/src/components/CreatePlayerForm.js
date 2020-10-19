import React from 'react'

const CreatePlayerForm = ({ fields, errors, onChange, onSubmit }) => {
  return (
    <form onSubmit={ onSubmit }>
      Player Name
      <br></br>
      <input type='text' name='name' placeholder='Enter Name' value={ fields.name } onChange={ onChange } />
      <br></br>
      { errors ? (<span style={{color: "red"}}>{ errors.name }<br></br></span>) : (<></>)}
      <input type='submit' value='Create' />
    </form>
  )
}

export default CreatePlayerForm
