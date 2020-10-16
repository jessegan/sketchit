# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_16_234701) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "canvases", force: :cascade do |t|
    t.bigint "lobby_id", null: false
    t.string "data_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["lobby_id"], name: "index_canvases_on_lobby_id"
  end

  create_table "lobbies", force: :cascade do |t|
    t.string "code"
    t.integer "capacity"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.bigint "lobby_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["lobby_id"], name: "index_players_on_lobby_id"
  end

  add_foreign_key "canvases", "lobbies"
  add_foreign_key "players", "lobbies"
end
