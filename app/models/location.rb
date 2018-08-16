class Location < ApplicationRecord
  belongs_to :addressable, polymorphic: true
  validate :validate_full_address

  def address
    [city, state, street, street2, zipcode].compact.join(', ')
  end

  def validate_full_address
    if city.present? || state.present?
      errors.add(:country, :blank) unless country.present?
      errors.add(:state, :blank) unless state.present?
      errors.add(:city, :blank) unless city.present?
      errors.add(:street, :blank) unless street.present?
      errors.add(:zipcode, :blank) unless zipcode.present?
    end
  end
end
