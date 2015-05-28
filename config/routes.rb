Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :lists do
        resources :items, only: [:create, :update, :destroy]
      end

      resources :users, only: [:index, :show] do
        collection do
          get :current
          post :sign_up
          post :sign_in
        end
      end
    end
  end

  root 'pages#index'
end
