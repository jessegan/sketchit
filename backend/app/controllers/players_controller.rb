class PlayersController < ApplicationController

  def create
    @lobby = Lobby.find_by(code: params[:code])

    if @lobby
      @player = Player.create(name: params[:name], lobby: @lobby)

      PlayersChannel.broadcast_to(@lobby,{ players: @lobby.players })

      render :create
    else
      render json: {
        message: "Unable to find lobby",
        status: 400
      }, status: 400
    end
  end

  def destroy
    player = Player.find(params[:id])
    lobby = player.lobby

    player.destroy

    if lobby.players.length > 0
      PlayersChannel.broadcast_to(lobby, { players: lobby.players })
    else
      lobby.destroy
    end
  end

end
