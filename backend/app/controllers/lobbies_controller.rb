class LobbiesController < ApplicationController

  def show
    @lobby = Lobby.find_by(code: params[:id])

    render :show
  end

  def create
    @lobby = Lobby.create(capacity: params[:capacity])
    @lobby.create_canvas

    render :create
  end

end
