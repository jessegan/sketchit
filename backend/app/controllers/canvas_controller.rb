class CanvasController < ApplicationController

  def create
    ActionCable.server.broadcast("canvas_#{params[:id]}", {
      prev: params[:prev],
      cur: params[:cur]
    })

    render json: {message: "success"}, status: 200
  end

end
