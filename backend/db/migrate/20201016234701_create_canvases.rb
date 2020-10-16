class CreateCanvases < ActiveRecord::Migration[6.0]
  def change
    create_table :canvases do |t|
      t.references :lobby, null: false, foreign_key: true
      t.string :data_url

      t.timestamps
    end
  end
end
