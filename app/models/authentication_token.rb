class AuthenticationToken < ActiveRecord::Base
  belongs_to :user

  before_validation :generate_token

  private

    def generate_token
      begin
        self.token = SecureRandom.urlsafe_base64(32, false)
      end while self.class.exists?(token: self.token)
    end
end
