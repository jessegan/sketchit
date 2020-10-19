class CanvasController < ApplicationController

  def show
    lobby = Lobby.find_by(code: params[:id])
    @canvas = lobby.canvas

    render :'canvases/show'
  end

  def draw
    ActionCable.server.broadcast("canvas_#{params[:id]}", {
      type: params[:type],
      data: params[:data]
    })

    render json: {message: "success"}, status: 200
  end

  def update
    Lobby.find_by(code: params[:id]).canvas.update(data_url: params[:data][:canvasData])
  end
end
