module Api
  module V1
    class ContactsController < ApplicationController
      before_action :ensure_record, only: [:show, :update, :destroy]

      def show
        render json: { contact: record }, status: 200
      end

      def index
        render json: { contacts: Contact }, status: 200
      end

      def create
        record.create!(allowed_params)
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

      def allowed_params
        params.require(:contact).permit(
          :first_name, :last_name, :job_title, :phone, :email,
          :comments, :connectable_id, :connectable_type,
          location_attributes: [:city, :state, :country, :zipcode, :street]
        )
      end

      def ensure_record
        @record = Contact.find(params[:id])
      end
    end
  end
end
