class User < ActiveRecord::Base
  has_many :authentication_tokens
  has_many :lists

  validates_presence_of :email
  validates_uniqueness_of :email

  has_secure_password
end
