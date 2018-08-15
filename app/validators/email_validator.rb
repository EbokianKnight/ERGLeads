class EmailValidator < ActiveModel::EachValidator
  def initialize(options)
    @allow_nil = options.delete(:allow_nil)
    @allow_blank = options.delete(:allow_blank)
    super
  end

  def validate_each(record, attribute, value)
    return if @allow_nil && value.nil?
    return if @allow_blank && value.blank?
    return if value&.match?(/.+@.+\..+/)
    record.errors.add(attribute.to_sym, :invalid_email)
  end
end
