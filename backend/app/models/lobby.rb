class Lobby < ApplicationRecord

  # ASSOCIATIONS

  has_many :players, dependent: :destroy

  # VALIDATIONS

  validates :code, presence: true

  attribute :capacity, default: 10

end
