class VenueGroup < ApplicationRecord
  validates :name, presence: true
  validates :phone, phone_number: true, allow_blank: true
  validates :email, email: true, allow_blank: true

  has_many :venues
  has_many :contacts, as: :connectable
  has_one :location, as: :addressable

  accepts_nested_attributes_for :location

  def default_name
    "Group #{id}"
  end
end
