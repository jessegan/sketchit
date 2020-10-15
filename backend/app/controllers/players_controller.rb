class PlayersController < ApplicationController

  def create
    @lobby = Lobby.find_by(code: params[:code])

    if @lobby
      @player = Player.create(name: params[:name], lobby: @lobby)

      PlayersChannel.broadcast_to(@lobby,{ players: @lobby.players })

      render :create
    else
      render json: {
        error: "Unable to find lobby",
        status: 400
      }, status: 400
    end
  end

end
