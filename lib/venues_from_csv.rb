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

  def create_venue_contact(record)
    Venue.create({
      name: record[0],
      location: Location.create(
        street: record[1],
        city: record[2],
        state: record[3],
        zipcode: record[4]
      ),
      phone: record[5],
      website: record[6],
      comments: record[7],
      kind: 'other',
      other_kind: 'N/A',
      contacts: [
        Contact.create({
          email: record[8],
          first_name: record[9],
          last_name: record[10],
          job_title: record[11]
        })
      ]
    })
    @num_records += 1
  rescue
    puts "Could not add row for #{record[0]}."
  end
end
