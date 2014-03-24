class Work < ActiveRecord::Base
  extend FriendlyId

  friendly_id :title, :use => [:slugged, :finders]
  has_attached_file :photo, :styles => { :thumb => "100x100>", :display => '1000x1000' }
  after_post_process :save_image_dimensions

  belongs_to :artist
  default_scope { order("sortorder ASC") }

  def display_url
    photo.url('display')
  end

  def aspect_ratio
    photo_width.to_f / photo_height.to_f
  end

  def next
    self.class.where(["sortorder > ?", self.sortorder]).first
  end

  def prev
    self.class.where(["sortorder < ?", self.sortorder]).last
  end

  private
  def save_image_dimensions
    geo = Paperclip::Geometry.from_file(photo.queued_for_write[:original])
    self.photo_width = geo.width
    self.photo_height = geo.height
  end
end
