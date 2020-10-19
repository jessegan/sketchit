class LobbiesController < ApplicationController

  def show
    @lobby = Lobby.find_by(code: params[:id])

    if @lobby
      render :show
    else
      render json: {
        message: "Unable to find lobby",
        status: 400
      }, status: 400
    end
  end

  def create
    @lobby = Lobby.create(capacity: params[:capacity])
    @lobby.create_canvas

    render :create
  end

end
