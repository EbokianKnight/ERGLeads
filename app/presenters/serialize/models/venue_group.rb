module Serialize
  module Models
    class VenueGroup < Presenter
      class Index < VenueGroup
        def initialize(array)
          @array = array
        end

        def as_json(*)
          @array.map do |object|
            {
              id: object.id,
              name: object.name || object.default_name,
              phone: object.phone,
              email: object.email,
              location: location_details(object)
            }
          end
        end
      end

      # show
      def as_json(*)
        {
          id: @object.id,
          name: @object.name || @object.default_name,
          phone: @object.phone,
          email: @object.email,
          location: location_details(@object),
          venues: venues,
          contacts: contacts,
          created_at: @object.created_at,
          updated_at: @object.updated_at
        }
      end

      def venues
        @object.venues.map do |venue|
          Serialize::Models::Venue.new(venue).as_json
        end
      end

      def contacts
        @object.contacts.map do |contact|
          Serialize::Models::Contact.new(contact).as_json
        end
      end

      def location_details(object)
        return nil unless object.location
        Serialize::Models::Location.new(object.location)
      end
    end
  end
end
