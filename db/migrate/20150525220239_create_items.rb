class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title
      t.string :url
      t.references :list, index: true, foreign_key: true
      t.integer :position, :default => 0

      t.timestamps null: false
    end
  end
end
