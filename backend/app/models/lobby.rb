class Lobby < ApplicationRecord

  # ASSOCIATIONS

  has_many :players, dependent: :destroy
  has_one :canvas

  # VALIDATIONS

  validates :code, presence: true
  attribute :code, :string, default: -> { SecureRandom.alphanumeric(6).upcase }

  attribute :capacity, :integer, default: 10

end
