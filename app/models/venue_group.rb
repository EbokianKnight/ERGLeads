class VenueGroup < ApplicationRecord
  validates :name, presence: true
  validates :phone, phone_number: true, allow_blank: true
  validates :email, email: true, allow_blank: true
  before_validation :ensure_website_protocol

  has_many :venues, dependent: :destroy
  has_many :contacts, as: :connectable, dependent: :destroy
  has_one :location, as: :addressable, dependent: :destroy

  accepts_nested_attributes_for :location

  def default_name
    "Group #{id}"
  end

  def ensure_website_protocol
    return unless website.present?
    return if website.match?(/^https?:\/\//)
    self.website = "http://#{website}"
  end
end
