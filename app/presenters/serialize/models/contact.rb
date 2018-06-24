module Serialize
  module Models
    class Contact < Presenter
      class Index < Presenter
        def initialize(array)
          @array = array
        end

        def as_json(*)
          @array.map do |object|
            {
              connectable_id: @object.connected_id,
              connectable_type: @object.connected_type,
              id: @object.id,
              first_name: @object.first_name,
              last_name: @object.last_name,
              phone: @object.phone,
              email: @object.email
            }
          end
        end
      end

      # show
      def as_json(*)
        {
          connectable_id: @object.connected_id,
          connectable_type: @object.connected_type,
          id: @object.id,
          first_name: @object.first_name,
          last_name: @object.last_name,
          job_title: @object.job_title,
          phone: @object.phone,
          email: @object.email,
          location: location_details
        }
      end

      def location_details
        return {} unless @object.location
        Serialize::Models::Location.new(@object.location).as_json
      end
    end
  end
end
