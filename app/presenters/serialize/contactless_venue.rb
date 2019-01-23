module Serialize
  class ContactlessVenue < Presenter
    class Index < ContactlessVenue
      def initialize(array)
        @array = array
      end

      def as_json(*)
        @array.each.with_object([]) do |object, presented|
          if object.email.present?
            presented << ContactlessVenue.new(object).as_json
          end
        end
      end
    end

    # show
    def as_json(*)
      {
        connectable_id: @object.id,
        connectable_type: 'Venue',
        connectable_kind: connectable_kind(@object),
        id: "v#{@object.id}",
        full_name: @object.name,
        first_name: nil,
        last_name: nil,
        job_title: nil,
        ext: @object.ext,
        phone: draw_phone_number(@object.phone),
        email: @object.email,
        location: location_details(@object),
        comments: "",
        created_at: @object.created_at,
        updated_at: @object.updated_at,
        venue_name: @object.name
      }
    end

    private

    def connectable_kind(venue)
      return venue.kind unless venue.kind == "other"
      venue.other_kind
    end

    def location_details(object)
      Serialize::Models::Location.new(object.location).as_json
    end
  end
end
