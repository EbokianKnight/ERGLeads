class Presenter
  def initialize(object)
    @object = object
  end

  def timestamp(datetime)
    return nil unless datetime
    datetime.utc.to_formatted_s(:iso8601)
  end

  def as_json(*)
    @object.as_json
  end
end
