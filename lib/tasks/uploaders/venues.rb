module Uploaders
  class Venues
    def initialize(replace_records: false)
      Venue.destroy_all if replace_records
      @data = read_records_csv
    end

    def read_records_csv
      @data = eval(File.reader(Rails.root.join('tmp/erg_venues.csv'))).drop(2)
    rescue
      raise 'Missing required file: /tmp/erg_venues.csv'
    end

    def run
      apply_data_to_database
    end

    def apply_data_to_database
      @data.each do |record|
        create_venue_contact(record)
      end
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
            title: record[11]
          })
        ]
      })
    rescue
      Rails.logger.info "record failed: #{record.join(', ')}"
    end
  end
end
