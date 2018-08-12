class AddColumnsToVenueContactAndLocation < ActiveRecord::Migration[5.2]
  def change
    add_column :venues, :ext, :string
    add_column :contacts, :ext, :string
    add_column :venue_groups, :ext, :string
    add_column :locations, :street2, :string
  end
end
