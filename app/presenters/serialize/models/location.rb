module Serialize
  module Models
    class Location < Presenter
      def as_json(*)
        {
          full_address: @object.address,
          country: @object.country,
          state: @object.state,
          city: @object.city,
          street: @object.street,
          zipcode: @object.zipcode
        }
      end
    end
  end
end
