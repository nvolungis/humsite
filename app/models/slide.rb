class Slide < ActiveRecord::Base
  has_attached_file :photo, :styles => { :thumb => '100x100>' }
end
