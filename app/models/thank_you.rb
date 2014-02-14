class ThankYou < ActiveRecord::Base
  has_attached_file :photo

	default_scope { order('sortorder ASC') }
end
