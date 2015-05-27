class Api::V1::ApplicationController < ActionController::Base
  include ActionController::ImplicitRender
  include ActionController::Serialization

  serialization_scope :current_user

  before_filter do
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    headers['Access-Control-Max-Age'] = '1728000'
    headers['Access-Control-Request-Method'] = '*'
  end

  before_filter do
    @token ||= request.headers['Token']
  end

  def current_user
    AuthenticationToken.find_by_token(@token).try(:user) if @token
  end

  def authenticate!
    head :unauthorized unless current_user
  end

  def check_access(object)
    head :unauthorized unless current_user && object.has_access?(current_user)
  end

  def cors_preflight
    head :ok if request.request_method == 'OPTIONS'
  end

  def default_serializer_options
    { root: false }
  end
end
