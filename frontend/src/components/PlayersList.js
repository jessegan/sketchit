import React from 'react'

const PlayersList = ({ players }) => {
  let playersList = players.map( (p) => (<p key={ p.id }>{ p.name }</p>))
  return (
    <div>
      <h3>Players</h3>

      { playersList}

    </div>
  )
}

export default PlayersList
