class Events < ApplicationRecord
  # name, date, description
  validates :name, presence: true
  validates :date, datetime: true, allow_blank: true
  belongs_to :venue
end
