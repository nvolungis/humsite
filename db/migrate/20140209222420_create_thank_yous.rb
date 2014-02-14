class CreateThankYous < ActiveRecord::Migration
  def change
    create_table :thank_yous do |t|
      t.string :name
      t.string :role

      t.timestamps
    end
  end
end
