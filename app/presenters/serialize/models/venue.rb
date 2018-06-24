module Serialize
  module Models
    class Venue < Presenter
      class Index < Presenter
        def initialize(array)
          @array = array
        end

        def as_json(*)
          @array.map do |object|
            {
              venue_group_id: object.venue_group_id,
              venue_group_name: object.organization_name,
              id: object.id,
              name: object.name,
              phone: object.phone,
              email: object.email
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
          name: @object.name,
          phone: @object.phone,
          email: @object.email,
          location: location_details,
          contacts: contacts,
          events: @object.events.map do |event|
            Serialize::Models::Events.new(event).as_json
          end,
          created_at: @object.created_at,
          updated_at: @object.updated_at
        }
      end

      def contacts
        @object.contacts.map do |contact|
          Serialize::Models::Contact.new(contact).as_json
        end
      end

      def location_details
        return {} unless @object.location
        Serialize::Models::Location.new(@object.location).as_json
      end
    end
  end
end
