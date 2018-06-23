module Api
  module V1
    class ContactGroupsController < ApplicationController
      before_action :ensure_record, only: [:show, :update, :destroy]

      def show
        render json: record.as_json(full: true), status: 200
      end

      def index
        render json: ContactGroup.all, status: 200
      end

      def create
        record.create!(allowed_params)
        render json: record.as_json(full: true), status: 202
      end

      def update
        record.update!(allowed_params)
        render json: record.as_json(full: true), status: 200
      end

      def destroy
        record.destroy
        render json: { message: :ok }, status: 200
      end

      private

      attr_reader :record

      def allowed_params
        params.require(:contact_group).permit(
          :name, :phone, :email, :comments,
          location_attributes: [:city, :state, :country, :zipcode, :street],
          contacts_attributes: [
            :id, :first_name, :last_name, :job_title, :phone, :email, :comments,
            location_attributes: [:city, :state, :country, :zipcode, :street]
          ],
          venues_attributes: [
            :id, :name, :kind, :phone, :email, :comments,
            location_attributes: [:city, :state, :country, :zipcode, :street]
          ]
        )
      end

      def ensure_record
        @record = ContactGroup.find(params[:id])
      end
    end
  end
end
