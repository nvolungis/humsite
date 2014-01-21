class AddSortorderToWork < ActiveRecord::Migration
  def change
    add_column :works, :sortorder, :integer
  end
end
