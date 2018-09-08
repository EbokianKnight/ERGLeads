class VenueGroup < ApplicationRecord
  validates :name, presence: true
  validates :phone, phone_number: true, allow_blank: true
  validates :email, email: true, allow_blank: true

  has_many :venues, dependent: :destroy
  has_many :contacts, as: :connectable, dependent: :destroy
  has_one :location, as: :addressable, dependent: :destroy

  accepts_nested_attributes_for :location

  def default_name
    "Group #{id}"
  end
end
