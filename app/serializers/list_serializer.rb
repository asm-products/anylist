class ListSerializer < ActiveModel::Serializer
  attributes :id, :title, :items_count, :items
end
