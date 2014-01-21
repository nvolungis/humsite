ActiveAdmin.register Work do

  config.filters = false;
  permit_params :id, :title, :photo, :sortorder, :artist_id

  index do 
    column :sortorder
    column do |work|
      image_tag work.photo.url
    end
    column :title
    actions
  end
  
  form :html => { :enctype => "multipart/form-data" } do |f|
    f.inputs do
      f.input :sortorder
      f.input :title
      f.input :artist
      f.input :photo, :as => :file, :hint => f.template.image_tag(f.object.photo.url(:thumbnail))
    end
    f.actions
  end
end
