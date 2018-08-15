class RemoveNullContraintsFromContactNames < ActiveRecord::Migration[5.2]
  def change
    change_column :contacts, :first_name, :string, null: true
    change_column :contacts, :last_name, :string, null: true
  end
end
