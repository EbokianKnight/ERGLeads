class ContactGroup < ApplicationRecord
  validates :phone, phone_number: true, allow_blank: true
  validates :email, email: true, allow_blank: true

  has_many :venues
  has_many :contacts
  has_one :location, as: :addressable

  accepts_nested_attributes_for :location, :venues, :contacts
end
