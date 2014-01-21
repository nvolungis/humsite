class CreateWorks < ActiveRecord::Migration
  def change
    create_table :works do |t|
      t.string :title
      t.integer :artist_id

      t.timestamps
    end
  end
end
