class ListSerializer < ActiveModel::Serializer
  attributes :id, :title, :user, :items_count, :items_attributes

  def items_attributes
    object.items
  end
end
