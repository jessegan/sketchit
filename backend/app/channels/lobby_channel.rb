class LobbyChannel < ApplicationCable::Channel
  def subscribed
    @lobby = Lobby.find_by(code: params[:code])
    puts "subscribed to lobby"
    stream_for @lobby
  end

  # def received(data)
  #   LobbyChannel.broadcast_to(@lobby, { players: @lobby.players })
  # end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
