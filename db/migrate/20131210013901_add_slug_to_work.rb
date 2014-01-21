class AddSlugToWork < ActiveRecord::Migration
  def change
    add_column :works, :slug, :string
  end
end
