class AddUserKind < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :kind, :string, null: false, default: 'user'
  end
end
