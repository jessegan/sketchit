class CreateLobbies < ActiveRecord::Migration[6.0]
  def change
    create_table :lobbies do |t|
      t.string :code
      t.integer :capacity

      t.timestamps
    end
  end
end
