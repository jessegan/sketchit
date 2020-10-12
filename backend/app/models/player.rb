class Player < ApplicationRecord

  # ASSOCIATIONS

  belongs_to :lobby

  # VALIDATIONS

  validates :name, presence: true

end
