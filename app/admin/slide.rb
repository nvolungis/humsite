ActiveAdmin.register Slide do

  config.filters = false;
  permit_params :id, :photo, :sortorder, :color

  index do 
    column :sortorder
    column do |slide|
      image_tag slide.photo.url
    end
    column :color
    actions
  end
  
  form :html => { :enctype => "multipart/form-data" } do |f|
    f.inputs do
      f.input :sortorder
      f.input :color
      f.input :photo, :as => :file, :hint => f.template.image_tag(f.object.photo.url(:thumbnail))
    end
    f.actions
  end
end
