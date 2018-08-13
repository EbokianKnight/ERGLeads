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
    @data = file.split("\r\n").drop(2).map { |line| line.split(',') }
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
    Venue.create({
      kind: valid_kind(record[0]) ? record[0] : 'other'
      other_kind: !valid_kind(record[0]) ? nil : record[0],
      name: record[1],
      location: Location.create(
        street: record[2],
        street2: record[3],
        city: record[4],
        state: record[5],
        zipcode: record[6]
      ),
      phone: record[7],
      ext: record[8],
      website: record[9],
      email: record[10],
      comments: record[12],
      contacts: build_contacts(record)
    })
    @num_records += 1
  rescue
    puts "Could not add row for #{record[0]}."
  end
end

def extract_contact(record, idx)
  return nil unless record[idx] || record[idx + 1]
  Contact.create({
    first_name: record[idx + 0],
    last_name: record[idx + 1],
    job_title: record[idx + 2],
    phone: record[idx + 3],
    ext: record[idx + 4],
    email: record[idx + 5],
    comments: record[idx + 11],
    location: Location.create(
      street: record[idx + 6],
      street2: record[idx + 7],
      city: record[idx + 8],
      state: record[idx + 9],
      zipcode: record[idx + 10]
    )
  )}
rescue
  puts "Could not add contact##{idx/10} for #{record[0]}."
  nil
end

def build_contact(record)
  [
    extract_contact(record, 13),
    extract_contact(record, 25),
    extract_contact(record, 37)
  ].conpact
end
