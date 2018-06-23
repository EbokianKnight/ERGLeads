class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def dev_draw
    return as_json if valid?
    ApiError::ValidationFailed.new(self).as_json
  end

  def as_json(*args)
    "Serialize::Models::#{self.class}".constantize.new(self).as_json
  rescue
    super(*args)
  end
end
