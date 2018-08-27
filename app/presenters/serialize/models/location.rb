module Serialize
  module Models
    class Location < Presenter
      def initialize(object, fallback = nil)
        super(object)
        @fallback = fallback
      end

      def as_json(*)
        {
          id: @object&.id,
          full_address: @object&.address || '',
          country: @object&.country || '',
          state: @object&.state || @fallback&.state || '',
          city: @object&.city || @fallback&.city || '',
          street: @object&.street || '',
          street2: @object&.street2 || '',
          zipcode: @object&.zipcode || ''
        }
      end
    end
  end
end
