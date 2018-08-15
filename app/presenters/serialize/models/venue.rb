module Serialize
  module Models
    class Venue < Presenter
      class Index < Venue
        def initialize(array)
          @array = array
        end

        def as_json(*)
          @array.map do |object|
            {
              id: object.id,
              type_of_venue: object.type_of_venue,
              name: object.name,
              ext: object.ext,
              phone: draw_phone_number(object.phone),
              website: object.website,
              location: {
                state: object.location&.state,
                city: object.location&.city,
              }
            }
          end
        end
      end

      # show
      def as_json(*)
        {
          venue_group_id: @object.venue_group_id,
          venue_group_name: @object.organization_name,
          id: @object.id,
          kind: @object.kind,
          other_kind: @object.other_kind,
          name: @object.name,
          ext: @object.ext,
          phone: draw_phone_number(@object.phone),
          email: @object.email,
          website: @object.website,
          location: location_details(@object),
          contacts: contacts,
          events: events,
          created_at: @object.created_at,
          updated_at: @object.updated_at,
          comments: @object.comments
        }
      end

      def contacts
        Serialize::Models::Contact::Index.new(@object.contacts).as_json
      end

      def events
        Serialize::Models::Event::Index.new(@object.events).as_json
      end

      def location_details(object)
        return {} unless object.location
        Serialize::Models::Location.new(object.location).as_json
      end
    end
  end
end
