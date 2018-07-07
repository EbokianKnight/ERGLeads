class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.as_json(*args)
    "Serialize::Models::#{self}::Index".constantize.new(
      self.all
    ).as_json
  rescue NameError
    self.all.map { |o| o.as_json(*args) }
  end

  def dev_draw
    return as_json if valid?
    ApiError::ValidationFailed.new(self).as_json
  end

  def as_json(*args)
    "Serialize::Models::#{self.class}".constantize.new(self).as_json(*args)
  rescue NameError
    Rails.logger.info("Unknown Serializer: Serialize::Models::#{self.class}")
    super(*args)
  end
end
