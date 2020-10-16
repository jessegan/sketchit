class CanvasChannel < ApplicationCable::Channel
  def subscribed
    stream_from "canvas_#{params[:lobby_code]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
