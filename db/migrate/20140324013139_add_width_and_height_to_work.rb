class AddWidthAndHeightToWork < ActiveRecord::Migration
  def change
    add_column :works, :photo_width, :integer
    add_column :works, :photo_height, :integer
  end
end
