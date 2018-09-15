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

  def website_responds?(url_str)
    url = URI.parse(url_str)
    Net::HTTP.start(url.host, url.port) do |http|
      http.head(url.request_uri).code == '200'
    end
  rescue
    false
  end
end
