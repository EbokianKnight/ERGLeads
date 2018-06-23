class ContactGroup < ApplicationRecord
  validates :name, presence: true
  validates :phone, phone_number: true, allow_blank: true
  validates :email, email: true, allow_blank: true

  has_many :venues
  has_many :contacts
  has_one :location, as: :addressable

  after_create :set_contact_group_name

  accepts_nested_attributes_for :location, :venues, :contacts

  private

  def set_contact_group_name
    return if name != "Anonymous"
    self.name = "Contact Group #{id&.to_s(16)}"
    save
  end
end
