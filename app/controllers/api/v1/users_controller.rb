class Api::V1::UsersController < Api::V1::ApplicationController
  before_action :authenticate!, only: [:current, :update]

  def index
    @users = User.all

    render json: @users
  end

  def show
    @user = User.find_by(:name => params[:id])

    render json: @user
  end

  def update
    if current_user.update(user_params)
      render json: @user
    else
      head :unprocessable_entity
    end
  end

  def sign_up
    @user = User.new(user_params)

    if @user.save
      render json: @user.authentication_tokens.create
    else
      head :unauthorized
    end
  end

  def sign_in
    @user = User.where(:email => user_params[:email]).first

    if @user && @user.authenticate(user_params[:password])
      render json: @user.authentication_tokens.create
    else
      head :unauthorized
    end
  end

  def current
    render json: current_user
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password)
    end
end
