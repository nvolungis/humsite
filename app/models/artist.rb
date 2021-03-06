class Artist < ActiveRecord::Base
  has_attached_file :photo, :styles => { :thumb => "100x100>" }
  belongs_to :issue
  has_many :works

  default_scope { order('weight ASC') }

  def parameterized_name
    name.parameterize
  end
end
