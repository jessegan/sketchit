class LobbiesController < ApplicationController

  def show
    @lobby = Lobby.find_by(code: params[:id])
  end

  def create
    @lobby = Lobby.create(lobby_params)

    render @lobby
  end

  def join
    @lobby = Lobby.find_by(code: params[:id])

    if @lobby
      @player = Player.create(name: params[:name], lobby: @lobby)

      render :join
    else

    end
  end

  private

  def lobby_params
    params.require(:lobby).permit(:capacity)
  end

end
