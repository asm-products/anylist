class Api::V1::UsersController < Api::V1::ApplicationController
  before_action :authenticate!, only: :current

  def index
    @users = User.all

    render json: @users
  end

  def show
    @user = User.find_by(:name => params[:id])

    render json: @user
  end

  def sign_up
    @user = User.new(:email => params[:email])
    @user.password = params[:password]
    
    if @user.save
      render json: @user.authentication_tokens.create
    else
      head :unauthorized
    end
  end

  def sign_in
    @user = User.where(:email => params[:email]).first
    
    if @user && @user.authenticate(params[:password])
      render json: @user.authentication_tokens.create
    else
      head :unauthorized
    end
  end

  def current
    render json: current_user
  end
end
