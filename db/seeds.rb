# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Faker::Config.locale = 'en-US'

Contact.destroy_all
Event.destroy_all
Venue.destroy_all
VenueGroup.destroy_all

def location_attrs
  return {
    city: Faker::Zelda.location,
    state: Faker::Address.state_abbr,
    zipcode: Faker::Address.zip_code,
    street: Faker::Address.street_address
  }
end

groups = []
8.times do |idx|
  group = VenueGroup.create(
    name: Faker::Zelda.character,
    comments: Faker::BackToTheFuture.quote,
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.cell_phone,
    location_attributes: location_attrs
  )
  groups.push(group)
end
puts "created groups: #{VenueGroup.count}"
groups.each do |group|
  [0,1,1].sample.times do |i|
    contact = Contact.create(
      connectable: group,
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      job_title: Faker::Job.title,
      comments: Faker::FamousLastWords.last_words,
      email: Faker::Internet.email,
      phone: Faker::PhoneNumber.cell_phone,
      location_attributes: location_attrs
    )
  end

  venues = []
  [1,1,2,3].sample.times do |i|
    random_kind = Venue::KINDS.sample
    other_kind = Faker::Coffee.variety if random_kind == 'other'
    venue = Venue.create(
      venue_group: group,
      name: Faker::Company.name,
      comments: Faker::Hacker.say_something_smart,
      email: Faker::Internet.email,
      phone: Faker::PhoneNumber.cell_phone,
      kind: random_kind,
      other_kind: other_kind,
      location_attributes: location_attrs
    )
    venues.push(venue)
  end

  venues.each do |venue|
    [1,2,3].sample.times do |i|
      contact = Contact.create(
        connectable: venue,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        job_title: Faker::Job.title,
        comments: Faker::FamousLastWords.last_words,
        email: Faker::Internet.email,
        phone: Faker::PhoneNumber.cell_phone,
        location_attributes: location_attrs
      )
    end

    [1,2,2,2,2,4,8].sample.times do |i|
      Event.create(
        venue: venue,
        name: Faker::Artist.name,
        description: Faker::Movie.quote,
        date: Faker::Date.between(3.months.ago, Date.today)
      )
    end
  end
end
puts "created venues: #{Venue.count}"
puts "created events: #{Event.count}"

# unaffiliated
Contact.create(
  first_name: 'Adam',
  last_name: 'Keller',
  job_title: 'Software Developer',
  phone: '1(614)329-6470',
  email: 'adam@example.com',
  location_attributes: {
    state: 'NY',
    city: 'New York',
    street: '123 Broadway',
    zipcode: 43229,
  }
)
puts "created contacts: #{Contact.count}"
