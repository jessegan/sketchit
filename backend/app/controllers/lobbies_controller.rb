class LobbiesController < ApplicationController

  def show
    @lobby = Lobby.find_by(code: params[:id])

    render :show
  end

  def create
    @lobby = Lobby.create(capacity: params[:capacity])
    @player = Player.create(name: params[:name], lobby: @lobby)

    render :join
  end

  def join
    @lobby = Lobby.find_by(code: params[:id])

    if @lobby
      @player = Player.create(name: params[:name], lobby: @lobby)

      LobbyChannel.broadcast_to(@lobby,{ players: @lobby.players })

      render :join
    else

    end
  end

end
