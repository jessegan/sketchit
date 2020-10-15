Rails.application.routes.draw do

  resources :lobbies, only: [:show,:create,:destroy], defaults: {format: 'json'}


  resources :players, only: [:create,:destroy], defaults: {format: 'json'}

  mount ActionCable.server => '/cable'

end
