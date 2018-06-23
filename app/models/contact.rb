class Contact < ApplicationRecord
  # first_name, last_name, job_title, phone, email, comments
  validates :first_name, :last_name, presence: true
  validates :phone, phone_number: true, allow_blank: true
  validates :email, email: true, allow_blank: true

  belongs_to :contact_group, optional: true
  has_one :location, as: :addressable

  accepts_nested_attributes_for :location

  before_create :ensure_contact_group

  def ensure_contact_group
    if contact_group_id.blank?
      new_contact_group = ContactGroup.create
      self.contact_group_id = new_contact_group.id
    end
  end
end
