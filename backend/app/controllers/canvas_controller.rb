class CanvasController < ApplicationController

  def show
    CanvasChannel.broadcast_to("canvas_#{params[:id]}". {
      prev: params[:prev],
      cur: params[:cur]
    })
  end

end
