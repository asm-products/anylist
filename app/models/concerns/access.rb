module Access
  extend ActiveSupport::Concern
 
  def has_access?(user)
    self.user == user
  end
end
