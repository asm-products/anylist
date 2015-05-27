class ListSerializer < ActiveModel::Serializer
  attributes :id, :title, :user, :is_owner, :items_count, :items_attributes

  def items_attributes
    object.items
  end

  def is_owner
    !!(scope && scope.id == object.user.id)
  end
end
