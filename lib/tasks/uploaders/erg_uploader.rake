namespace :uploaders do
  desc 'Upload master database from excel'
  task venues: :environment do
    Uploaders::Venues.new.run
  end
end
