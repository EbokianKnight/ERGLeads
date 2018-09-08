class Location < ApplicationRecord
  belongs_to :addressable, polymorphic: true
  validate :validate_full_address

  def address
    "#{[street, street2].compact.join}, #{city}, #{state}, #{country} #{zipcode}"
  end

  def validate_full_address
    if city.present? || state.present?
      errors.add(:state, :blank) unless state.present?
      errors.add(:city, :blank) unless city.present?
    end

    if [street, zipcode, street2].any? { |field| field.present? }
      errors.add(:state, :blank) unless state.present?
      errors.add(:city, :blank) unless city.present?
      errors.add(:street, :blank) unless street.present?
      errors.add(:zipcode, :blank) unless zipcode.present?
    end
  end
end
