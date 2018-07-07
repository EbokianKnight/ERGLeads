module Serialize
  module Models
    class Event < Presenter
      class Index < Event
        def initialize(array)
          @array = array
        end

        def as_json(*)
          @array.map do |object|
            {
              venue_id: object.venue_id,
              venue_name: object.venue&.name,
              id: object.id,
              name: object.name,
              date: timestamp(object.date)
            }
          end
        end
      end

      # show
      def as_json(*)
        {
          venue_id: @object.venue_id,
          venue_name: @object.venue&.name,
          id: @object.id,
          name: @object.name,
          date: timestamp(@object.date),
          comments: @object.comments,
          created_at: timestamp(@object.created_at),
          updated_at: timestamp(@object.updated_at)
        }
      end
    end
  end
end
