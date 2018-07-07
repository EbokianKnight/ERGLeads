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
        Serialize::Models::Venue::Index.new(@object.venues).as_json
      end

      def contacts
        Serialize::Models::Contact::Index.new(@object.contacts).as_json
      end

      def location_details(object)
        return nil unless object.location
        Serialize::Models::Location.new(object.location)
      end
    end
  end
end
