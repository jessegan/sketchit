class LobbiesController < ApplicationController

  def show
    @lobby = Lobby.find_by(code: params[:id])
  end

end
