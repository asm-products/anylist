class Item < ActiveRecord::Base
  belongs_to :list, :counter_cache => true

  validates_presence_of :title, :position
end
