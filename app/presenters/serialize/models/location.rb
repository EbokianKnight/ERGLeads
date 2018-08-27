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
          state: state,
          city: city,
          street: @object&.street || '',
          street2: @object&.street2 || '',
          zipcode: @object&.zipcode || ''
        }
      end

      def state
        return @object.state if @object&.state.present?
        return @fallback.state if @fallback&.state.present?
        ''
      end

      def city
        return @object.city if @object&.city.present?
        return @fallback.city if @fallback&.city.present?
        ''
      end
    end
  end
end
