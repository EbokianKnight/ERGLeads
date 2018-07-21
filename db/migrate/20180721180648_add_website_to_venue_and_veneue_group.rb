class AddWebsiteToVenueAndVeneueGroup < ActiveRecord::Migration[5.2]
  def change
    add_column :venues, :website, :string
    add_column :venue_groups, :website, :string
  end
end
