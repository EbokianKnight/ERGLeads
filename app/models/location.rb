class Location < ApplicationRecord
  belongs_to :addressable, polymorphic: true
  validate :validate_full_address

  def address
    "#{[street, street2].compact.join}, #{city}, #{state}, #{country} #{zipcode}"
    [street, street2, city, state, zipcode, country].compact.join(', ')
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
