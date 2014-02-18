Humsite::Application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'static#home'
	get 'about', to: 'static#about'
  resources :works, :only => [:index]
  resources :issues, :only => [:show]
end
