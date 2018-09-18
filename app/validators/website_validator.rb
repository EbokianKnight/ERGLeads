class WebsiteValidator < ActiveModel::EachValidator
  def initialize(options)
    @allow_nil = options.delete(:allow_nil)
    @allow_blank = options.delete(:allow_blank)
    super
  end

  def validate_each(record, attribute, value)
    return if @allow_nil && value.nil?
    return if @allow_blank && value.blank?
    return if website_responds?(value)
    record.errors.add(attribute.to_sym, :invalid_website)
  end

  # Will probably remove the actual url call in the future, but given the very
  # limited use of the app, this isnt a high priority atm. We will see.
  # I still think it's kind of cool. (though I do not recommend this for real)
  def website_responds?(url_str)
    url = URI.parse(url_str)
    Net::HTTP.get_response(url).code == "200"
  rescue
    false
  end
end
