class Location < ApplicationRecord
  validates :city, :state, :street, :zipcode, presence: true
  belongs_to :addressable, polymorphic: true

  def address
    [city, state, street, zipcode].compact.join(', ')
  end
end