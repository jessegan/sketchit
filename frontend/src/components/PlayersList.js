import React from 'react'

const PlayersList = ({ players }) => {
  let playersList = players.map( (p) => (<p key={ p.id }>{ p.name }</p>))
  return (
    <>
      <h3>Players</h3>

      { playersList}

    </>
  )
}

export default PlayersList
