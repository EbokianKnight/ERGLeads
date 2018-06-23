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

  belongs_to :contact_group, optional: true
  has_one :location, as: :addressable
  has_many :events

  accepts_nested_attributes_for :events

  before_create :ensure_contact_group

  def ensure_contact_group
    if contact_group_id.blank?
      new_contact_group = ContactGroup.create
      self.contact_group_id = new_contact_group.id
    end
  end

  def other_kinds_required?
    return true unless kind == 'other'
    errors.add(:other_kind, :blank) unless other_kind.present?
  end
end
