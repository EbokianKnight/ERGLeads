module Serialize
  module Models
    class Contact < Presenter
      def as_json(*)
        {
          contact_group_id: @object.contact_group_id,
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
