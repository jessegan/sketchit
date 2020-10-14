Rails.application.routes.draw do

  resources :lobbies, only: [:show,:create,:destroy], defaults: {format: 'json'} do
    member do
      post '/join', to: 'lobbies#join'
    end
  end

  mount ActionCable.server => '/cable'

end
