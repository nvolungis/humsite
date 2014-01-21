Humsite::Application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  root 'static#home'
  resources :works, :only => [:index, :show]
end
