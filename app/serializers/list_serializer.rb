class ListSerializer < ActiveModel::Serializer
  attributes :id, :title, :items_count
  has_one :user
end
