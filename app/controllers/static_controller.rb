class StaticController < ApplicationController
  def home
    @homepage = Homepage.new
  end
end
