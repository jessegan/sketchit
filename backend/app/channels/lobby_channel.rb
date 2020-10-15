class LobbyChannel < ApplicationCable::Channel
  def subscribed
    @lobby = Lobby.find_by(code: params[:code])
    stream_for @lobby
  end

  def unsubscribed
  end
end
