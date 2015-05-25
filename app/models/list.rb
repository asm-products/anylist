class List < ActiveRecord::Base
  belongs_to :user
  has_many :items

  validates_presence_of :title, :user

  accepts_nested_attributes_for :items, allow_destroy: true
end
