json.code @lobby.code
json.capacity @lobby.capacity

json.players @lobby.players do |player|
  json.name player.name
end