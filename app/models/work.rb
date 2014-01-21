class Work < ActiveRecord::Base
  extend FriendlyId

  friendly_id :title, :use => [:slugged, :finders]
  has_attached_file :photo, :styles => { :thumb => "100x100>" }
  belongs_to :artist
  default_scope order("sortorder ASC")

  def next
    self.class.where(["sortorder > ?", self.sortorder]).first
  end

  def prev
    self.class.where(["sortorder < ?", self.sortorder]).last
  end
end
