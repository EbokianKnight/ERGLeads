module Serialize
  module Models
    class Venue < Presenter
      def as_json(full: false)
        {
          contact_group_id: @object.contact_group_id,
          id: @object.id,
          name: @object.name,
          phone: @object.phone,
          email: @object.email,
          location: location_details
        }.tap do |hash|
          next unless full
          hash[:events] = @object.events.map do |event|
            Serialize::Models::Events.new(event).as_json
          end
        end
      end

      def location_details
        return {} unless @object.location
        Serialize::Models::Location.new(@object.location).as_json
      end
    end
  end
end
