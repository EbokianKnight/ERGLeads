module Serialize
  module Models
    class Location < Presenter
      def as_json(*)
        {
          id: @object&.id,
          full_address: @object&.address || '',
          country: @object&.country || '',
          state: @object&.state || '',
          city: @object&.city || '',
          street: @object&.street || '',
          street2: @object&.street2 || '',
          zipcode: @object&.zipcode || ''
        }
      end
    end
  end
end
