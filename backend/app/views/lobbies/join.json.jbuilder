json.lobby do
  json.partial! 'lobbies/lobby', lobby: @lobby
end

json.player do
  json.partial! 'players/player', player: @player
end