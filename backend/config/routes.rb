Rails.application.routes.draw do

  resources :lobbies, only: [:show,:create,:destroy] do
  end

end
