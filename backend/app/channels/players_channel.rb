class PlayersChannel < ApplicationCable::Channel
  def subscribed
    lobby = Lobby.find_by(code: params[:code])
    stream_for lobby
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
