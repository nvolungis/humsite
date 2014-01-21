class AddSlugIndexColumnToWork < ActiveRecord::Migration
  def change
    add_index :works, :slug, :unique => true
  end
end
