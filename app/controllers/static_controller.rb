class StaticController < ApplicationController
  def home
    @homepage = Homepage.new
  end

	def about
		@about = About.new
	end
end
