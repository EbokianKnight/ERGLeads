module Api
  module V1
    class ContactsController < ApiController
      before_action :ensure_record, only: [:show, :update, :destroy]

      def show
        render json: { contact: record }, status: 200
      end

      def index
        render json: { contacts: present_records }, status: 200
      end

      def create
        record = Contact.new(allowed_params)
        record.save!
        render json: { contact: record }, status: 202
      end

      def update
        record.update!(allowed_params)
        render json: { contact: record }, status: 200
      end

      def destroy
        record.destroy
        render json: { contact: nil }, status: 200
      end

      private

      attr_reader :record

      def present_records
        contact_records.concat(venueless_contact_records)
      end

      def contact_records
        Serialize::Models::Contact::Index.new(
          Contact.includes(:location, connectable: [:location]).order(:last_name)
        ).as_json
      end

      def venueless_contact_records
        Serialize::ContactlessVenue::Index.new(
          Venue.no_contacts.includes(:location)
        ).as_json
      end

      def allowed_params
        params.fetch('contact', {}).permit(
          :first_name, :last_name, :job_title, :phone, :email, :ext,
          :comments, :connectable_id, :connectable_type,
          location_attributes: [:city, :state, :country, :zipcode, :street, :street2]
        )
      end

      def ensure_record
        @record = Contact.find(params[:id])
      end
    end
  end
end
