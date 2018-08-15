class Location < ApplicationRecord
  belongs_to :addressable, polymorphic: true

  def address
    [city, state, street, street2, zipcode].compact.join(', ')
  end
end
