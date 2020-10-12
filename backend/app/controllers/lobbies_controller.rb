class LobbiesController < ApplicationController

  def show
    @lobby = Lobby.find_by(code: params[:id])
  end

  def create
    @lobby = Lobby.create(lobby_params)

    render @lobby
  end

  def join
    @lobby = Lobby.find_by(code: params[:code])

    if @lobby
      @player = @lobby.players.create(name: params[:name])

      render :join
    else

    end
  end

  private

  def lobby_params
    params.require(:lobby).permit(:capacity)
  end

end
