class AddPhotoToSlides < ActiveRecord::Migration
  def self.up
    add_attachment :slides, :photo
  end

  def self.down
    remove_attachment :slides, :photo
  end
end
