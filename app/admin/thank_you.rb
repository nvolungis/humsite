ActiveAdmin.register ThankYou do

  config.filters = false;
  permit_params :id, :photo, :name, :role, :sortorder

  index do 
    column :name
    column :role
		column :sortorder
    column do |thank_you|
      image_tag thank_you.photo.url
    end
    actions
  end
  
  form :html => { :enctype => "multipart/form-data" } do |f|
    f.inputs do
      f.input :name
      f.input :role
			f.input :sortorder
      f.input :photo, :as => :file, :hint => f.template.image_tag(f.object.photo.url(:thumbnail))
    end
    f.actions
  end
end
