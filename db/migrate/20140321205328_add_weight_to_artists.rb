class AddWeightToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :weight, :integer
  end
end
