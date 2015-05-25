class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title
      t.references :user, index: true, foreign_key: true
      t.integer :items_count, :default => 0

      t.timestamps null: false
    end
  end
end
