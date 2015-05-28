class List < ActiveRecord::Base
  include Access

  belongs_to :user
  has_many :items

  validates_presence_of :title, :user

  accepts_nested_attributes_for :items, allow_destroy: true, reject_if: proc { |a| a['title'].blank? }
end
