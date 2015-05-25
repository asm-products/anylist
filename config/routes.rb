Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :lists do
        resources :items, only: [:create, :update, :destroy]
      end

      namespace :users do
        get 'users' => 'users#index'
        post :sign_up
        post :sign_in
        get :current
      end
    end
  end

  root 'pages#index'
end
