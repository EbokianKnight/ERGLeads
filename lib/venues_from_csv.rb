class VenuesFromCsv
  def initialize(replace_records: false)
    if replace_records
      Venue.destroy_all
      VenueGroup.destroy_all
      Contact.destroy_all
      Location.destroy_all
      Event.destroy_all
    end
    @data = read_records_csv
  end

  def read_records_csv
    file = File.read(Rails.root.join('tmp/erg_venues.csv'))
    @data = file.split("\r\n").drop(1).map { |line| line.split(',') }
  rescue
    raise 'Missing required file: /tmp/erg_venues.csv'
  end

  def run
    apply_data_to_database
  end

  def apply_data_to_database
    @num_records = 0
    puts "Adding records from #{@data.length} lines"
    @data.each do |record|
      next if record.none?(&:present?)
      create_venue_contact(record)
    end
    puts "Finished. Added #{@num_records} records."
  end

  def valid_kind(kind)
    %w[
      amphitheater
      casino
      club-bar
      fair-festival
      summer concert series
      theatre-pac
      other
    ].include?(kind)
  end

  def create_venue_contact(record)
    Venue.create!({
      kind: (valid_kind(record[0]) ? record[0] : 'other'),
      other_kind: (!valid_kind(record[0]) ? nil : record[0]),
      name: record[1],
      location: extract_location(record, 2),
      phone: extract_phone(record[7]),
      ext: record[8],
      website: record[9],
      email: record[10],
      comments: record[11],
      contacts: build_contacts(record)
    })
    @num_records += 1
  rescue ActiveRecord::RecordInvalid => invalid
    puts "Could not add #{record[1]}. b/c: #{invalid.record.errors.details}"
    puts "     phone: #{record[7]}, email: #{record[10]}"
    nil
  rescue => e
    puts "Could not add #{record[1]}. b/c #{e.class}: #{e.message}"
    nil
  end
end

def extract_location(record, idx)
  return nil if record[idx..idx+4]&.compact&.empty?
  Location.new(
    street: record[idx],
    street2: record[idx+1],
    city: record[idx+2],
    state: record[idx+3],
    zipcode: record[idx+4]
  )
end

def extract_phone(phone)
  return nil unless phone.present?
  phone.gsub(/[[^\d]+]/, '')
end

def extract_contact(record, idx)
  return nil unless record[idx].present? || record[idx + 1].present?
  Contact.create!({
    first_name: record[idx + 0],
    last_name: record[idx + 1],
    job_title: record[idx + 2],
    phone: extract_phone(record[idx + 3]),
    ext: record[idx + 4],
    email: record[idx + 5],
    comments: record[idx + 11],
    location: extract_location(record, idx+6)
  })
rescue ActiveRecord::RecordInvalid => invalid
  puts "Could not add contact##{idx/10} for #{record[1]}. b/c: #{invalid.record.errors.details}"
  puts "     phone: #{record[idx + 3]}, email: #{record[idx + 5]}"
  nil
rescue => e
  puts "Could not add contact##{idx/10} for #{record[1]}. b/c #{e.class}: #{e.message}"
  nil
end

def build_contacts(record)
  [
    extract_contact(record, 12),
    extract_contact(record, 24),
    extract_contact(record, 36)
  ].compact
end
