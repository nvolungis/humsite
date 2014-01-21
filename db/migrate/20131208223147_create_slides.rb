class CreateSlides < ActiveRecord::Migration
  def change
    create_table :slides do |t|
      t.integer :sortorder
      t.string :color

      t.timestamps
    end
  end
end
