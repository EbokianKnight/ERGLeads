class RemoveNullContraintsFromLocationTable < ActiveRecord::Migration[5.2]
  def change
    change_column :locations, :country, :string, default: 'USA', null: true
    change_column :locations, :city, :string, null: true
    change_column :locations, :state, :string, null: true
    change_column :locations, :street, :string, null: true
    change_column :locations, :zipcode, :string, null: true
  end
end
