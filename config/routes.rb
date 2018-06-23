Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :contact_groups, except: [:new, :edit]
      resources :contacts, except: [:new, :edit]
      resources :venues, except: [:new, :edit]
      resources :events, except: [:new, :edit]
    end
  end

  root to: "pages#root"
end
