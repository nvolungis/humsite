class AddAttachmentPhotoToThankYous < ActiveRecord::Migration
  def self.up
    change_table :thank_yous do |t|
      t.attachment :photo
    end
  end

  def self.down
    drop_attached_file :thank_yous, :photo
  end
end
