class CanvasController < ApplicationController

  def show
    lobby = Lobby.find_by(code: params[:id])
    @canvas = lobby.canvas

    render :'canvases/show'
  end

  def update
    #Lobby.find_by(code: params[:id]).canvas.update(data_url: params[:canvasData])

    ActionCable.server.broadcast("canvas_#{params[:id]}", {
      type: params[:type],
      data: params[:data]
    })

    render json: {message: "success"}, status: 200
  end


end
