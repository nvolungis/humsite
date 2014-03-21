ActiveAdmin.register Artist do
  
  config.filters = false
  permit_params :id, :name, :bio, :photo, :link, :neighborhood, :issue_id, :color, :weight

  index do
    column :max_width => "200px" do |artist|
      image_tag artist.photo.url
    end
    column :weight
    column :name
    column :neighborhood
    column :issue
    actions
  end


  
  form :html => { :enctype => "multipart/form-data" } do |f|
    f.inputs "Details" do
      f.input :name
      f.input :weight
      f.input :neighborhood
      f.input :bio
      f.input :link
      f.input :color
      f.input :issue
      f.input :photo, :as => :file, :hint => f.template.image_tag(f.object.photo.url(:thumbnail))
    end
    f.actions
  end
end
