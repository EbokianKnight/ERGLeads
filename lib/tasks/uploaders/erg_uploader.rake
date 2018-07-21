require 'venues_from_csv'

namespace :uploaders do
  desc 'Upload master database from excel'
  task venues: :environment do
    VenuesFromCsv.new(replace_records: true).run
  end
end
