class LobbiesController < ApplicationController

  def show
    @lobby = Lobby.find_by(code: params[:id])

    render :show
  end

  def create
    @lobby = Lobby.create(capacity: params[:capacity])
    @player = Player.create(name: params[:name], lobby: @lobby)

    render :create
  end

end
