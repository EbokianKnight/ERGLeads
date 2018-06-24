class Contact < ApplicationRecord
  # first_name, last_name, job_title, phone, email, comments
  validates :first_name, :last_name, presence: true
  validates :phone, phone_number: true, allow_blank: true
  validates :email, email: true, allow_blank: true

  belongs_to :connectable, polymorphic: true, optional: true
  has_one :location, as: :addressable

  accepts_nested_attributes_for :location
end
