class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name
      t.text :bio
      t.string :neighborhood
      t.string :link

      t.timestamps
    end
  end
end
