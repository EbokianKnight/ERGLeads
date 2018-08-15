class Contact < ApplicationRecord
  # first_name, last_name, job_title, phone, email, comments
  validates :phone, phone_number: true, allow_blank: true
  # validates :email, email: true, allow_blank: true
  validate :validate_has_some_name

  belongs_to :connectable, polymorphic: true, optional: true
  has_one :location, as: :addressable

  def validate_has_some_name
    return if first_name.present? || last_name.present?
    errors.add(:first_name, :blank)
    errors.add(:last_name, :blank)
  end

  accepts_nested_attributes_for :location
end
