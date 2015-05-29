# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

10.times do
  user = User.create!(
    :name => Faker::Lorem.word,
    :email => Faker::Internet.safe_email,
    :password => Faker::Internet.password
  )

  10.times do
    list = user.lists.create!(
      :title => Faker::Lorem.sentence
    )

    10.times do
      list.items.create!(
        :title => Faker::Lorem.sentence
      )
    end
  end
end
