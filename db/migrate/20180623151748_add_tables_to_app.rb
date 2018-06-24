class AddTablesToApp < ActiveRecord::Migration[5.2]
  def change
    create_table :venue_groups do |t|
      t.string :name
      t.text :comments
      t.string :email
      t.string :phone
      t.timestamps
    end

    create_table :contacts do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :job_title
      t.string :email
      t.string :phone
      t.text :comments
      t.references :connectable, polymorphic: true
      t.timestamps
    end

    create_table :venues do |t|
      t.string :name, null: false
      t.string :kind
      t.string :other_kind
      t.string :email
      t.string :phone
      t.text :comments
      t.integer :venue_group_id
      t.timestamps
    end
    add_index :venues, :venue_group_id

    create_table :locations do |t|
      t.string :country, null: false, default: 'USA'
      t.string :city, null: false
      t.string :state, null: false
      t.string :street, null: false
      t.string :zipcode, null: false
      t.references :addressable, polymorphic: true
      t.timestamps
    end

    create_table :events do |t|
      t.string :name, null: false
      t.datetime :date
      t.integer :venue_id
      t.text :description
      t.timestamps
    end
    add_index :events, :venue_id
  end
end
