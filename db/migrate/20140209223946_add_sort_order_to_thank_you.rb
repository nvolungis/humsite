class AddSortOrderToThankYou < ActiveRecord::Migration
  def change
    add_column :thank_yous, :sortorder, :integer
  end
end
