Rails.application.routes.draw do

  resources :lobbies, only: [:show,:create,:destroy], defaults: {format: 'json'} do
    member do
      get '/canvas', to: 'canvas#show'
      patch '/canvas', to: 'canvas#update'
      post '/canvas/draw', to: 'canvas#draw'
    end    
  end

  resources :players, only: [:create,:destroy], defaults: {format: 'json'}

  mount ActionCable.server => '/cable'

end
