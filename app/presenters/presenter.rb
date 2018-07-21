class Presenter
  def initialize(object)
    @object = object
  end

  def timestamp(datetime)
    return nil unless datetime
    datetime.utc.to_formatted_s(:iso8601)
  end

  def draw_phone_number(phone)
    return nil unless phone
    numbers = phone.scan(/\d/).join('')
    case numbers.length
    when 7 then "#{numbers[0..2]}-#{numbers[3..-1]}"
    when 10 then "#{numbers[0..2]}-#{numbers[3..5]}-#{numbers[6..-1]}"
    when 11 then "#{numbers[0]}-#{numbers[1..3]}-#{numbers[4..6]}-#{numbers[7..-1]}"
    else phone
    end
  end

  def as_json(*)
    @object.as_json
  end
end
