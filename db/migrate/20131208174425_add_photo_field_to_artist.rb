class AddPhotoFieldToArtist < ActiveRecord::Migration
  def self.up
    add_attachment :artists, :photo
  end

  def self.down
    remove_attachment :artists, :photo
  end
end
