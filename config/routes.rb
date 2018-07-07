Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :contacts, except: [:new, :edit]
      resources :venue_groups, except: [:new, :edit]
      resources :venues, except: [:new, :edit]
      resources :events, except: [:new, :edit]
    end
  end

  get 'venues', to: "pages#root"
  get 'groups', to: "pages#root"
  get 'events', to: "pages#root"
  get 'contacts', to: "pages#root"
  root to: "pages#root"
end
