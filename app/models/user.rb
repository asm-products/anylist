class User < ActiveRecord::Base
  has_many :authentication_tokens
  has_many :lists

  validates_presence_of :email
  validates_uniqueness_of :email

  validates :name, format: { with: /\A[a-zA-Z0-9]+\Z/ }

  has_secure_password
end
