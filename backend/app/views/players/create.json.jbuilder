json.lobbyCode @lobby.code

json.player do
  json.partial! 'players/player', player: @player
end