# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_12_234106) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contacts", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "job_title"
    t.string "email"
    t.string "phone"
    t.text "comments"
    t.string "connectable_type"
    t.bigint "connectable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ext"
    t.index ["connectable_type", "connectable_id"], name: "index_contacts_on_connectable_type_and_connectable_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "date"
    t.integer "venue_id"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["venue_id"], name: "index_events_on_venue_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "country", default: "USA", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "street", null: false
    t.string "zipcode", null: false
    t.string "addressable_type"
    t.bigint "addressable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "street2"
    t.index ["addressable_type", "addressable_id"], name: "index_locations_on_addressable_type_and_addressable_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "kind", default: "user", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "venue_groups", force: :cascade do |t|
    t.string "name"
    t.text "comments"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "website"
    t.string "ext"
  end

  create_table "venues", force: :cascade do |t|
    t.string "name", null: false
    t.string "kind"
    t.string "other_kind"
    t.string "email"
    t.string "phone"
    t.text "comments"
    t.integer "venue_group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "website"
    t.string "ext"
    t.index ["venue_group_id"], name: "index_venues_on_venue_group_id"
  end

end
