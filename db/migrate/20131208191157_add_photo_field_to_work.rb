class AddPhotoFieldToWork < ActiveRecord::Migration
  def self.up
    add_attachment :works, :photo
  end

  def self.down
    remove_attachment :works, :photo
  end
end
