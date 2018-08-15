class Venue < ApplicationRecord
  validates :name, presence: true
  validates :phone, phone_number: true, allow_blank: true
  validates :email, email: true, allow_blank: true
  before_validation :other_kinds_default

  belongs_to :venue_group, optional: true
  has_many :contacts, as: :connectable
  has_one :location, as: :addressable
  has_many :events

  accepts_nested_attributes_for :location, update_only: true
  accepts_nested_attributes_for :contacts
  accepts_nested_attributes_for :events

  def type_of_venue
    return other_kind if kind == 'other'
    kind
  end

  def other_kinds_default
    return unless kind == 'other'
    other_kind = 'N/A' unless other_kind.present?
  end

  def organization_name
    return nil unless venue_group
    venue_group.name || venue_group.default_name
  end
end
