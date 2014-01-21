class WorksController < ApplicationController
  def index
    @work = Work.first
    @artist = @work.artist
  end

  def show
    @work = Work.find(params[:id])
    @artist = @work.artist
  end
end
