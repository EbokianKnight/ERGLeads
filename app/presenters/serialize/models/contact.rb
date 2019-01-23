module Serialize
  module Models
    class Contact < Presenter
      class Index < Contact
        def initialize(array)
          @array = array
        end

        def as_json(*)
          @array.map do |object|
            Contact.new(object).as_json
          end
        end
      end

      # show
      def as_json(*)
        {
          connectable_id: @object.connectable_id,
          connectable_type: @object.connectable_type,
          connectable_kind: connectable_kind(@object),
          id: @object.id,
          full_name: "#{@object.first_name} #{@object.last_name}".squish,
          first_name: @object.first_name,
          last_name: @object.last_name,
          job_title: @object.job_title,
          ext: @object.ext,
          phone: draw_phone_number(@object.phone),
          email: @object.email,
          location: location_details(@object),
          comments: @object.comments,
          created_at: @object.created_at,
          updated_at: @object.updated_at,
          venue_name: @object.connectable&.name
        }
      end

      private

      def connectable_kind(object)
        venue = object&.connectable
        return "" unless venue
        return venue.kind unless venue.kind == "other"
        venue.other_kind
      end

      def location_details(object)
        Serialize::Models::Location.new(
          object.location,
          object.connectable&.location
        ).as_json
      end
    end
  end
end
