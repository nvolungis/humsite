class AddColorToArtist < ActiveRecord::Migration
  def change
    add_column :artists, :color, :string
  end
end
