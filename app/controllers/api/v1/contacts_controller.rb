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
        Contact.create!(allowed_params)
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
        Serialize::Models::Contact::Index.new(Contact.order(:last_name).includes(:location, :connectable))
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
