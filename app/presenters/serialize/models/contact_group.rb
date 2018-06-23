module Serialize
  module Models
    class ContactGroup < Presenter
      def as_json(*)
        {
          id: @object.id,
          name: @object.name,
          phone: @object.phone,
          email: @object.email,
          location: location_details,
          venues: venues,
          contacts: contacts
        }
      end

      def venues
        @object.venues.map do |venue|
          Serialize::Models::Venue.new(venue).as_json
        end
      end

      def contacts
        @object.contacts.map do |contact|
          Serialize::Models::Contact.new(contact).as_json
        end
      end

      def location_details
        return nil unless @object.location
        Serialize::Models::Location.new(@object.location)
      end
    end
  end
end