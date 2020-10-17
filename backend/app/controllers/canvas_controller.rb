class CanvasController < ApplicationController

  def show
    lobby = Lobby.find_by(code: params[:id])
    @canvas = lobby.canvas

    render :show
  end

  def create
    lobby = Lobby.find_by(code: params[:id])
    lobby.canvas.update(data_url: params[:canvasData])

    ActionCable.server.broadcast("canvas_#{params[:id]}", {
      prev: params[:prev],
      cur: params[:cur],
      color: params[:color],
      size: params[:size]
    })

    render json: {message: "success"}, status: 200
  end

end
