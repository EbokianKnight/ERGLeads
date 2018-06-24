class Venue < ApplicationRecord
  KINDS = [
    'auditorium',
    'bar',
    'casino',
    'corporate',
    'fair',
    'festival',
    'theater',
    'opera house',
    'performing arts center',
    'private',
    'speedway',
    'summer concert series',
    'other'
  ]

  validates :name, presence: true
  validates :kind, inclusion: KINDS
  validates :phone, phone_number: true, allow_blank: true
  validates :email, email: true, allow_blank: true
  validate :other_kinds_required?

  belongs_to :venue_group, optional: true
  has_many :contacts, as: :connectable
  has_one :location, as: :addressable
  has_many :events

  accepts_nested_attributes_for :events

  def other_kinds_required?
    return true unless kind == 'other'
    errors.add(:other_kind, :blank) unless other_kind.present?
  end

  def organization_name
    return nil unless venue_group
    venue_group.name || venue_group.default_name
  end
end
