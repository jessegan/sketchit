class Lobby < ApplicationRecord

  # ASSOCIATIONS

  has_many :players, dependent: :destroy

end
