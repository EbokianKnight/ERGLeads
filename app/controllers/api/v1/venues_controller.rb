module Api
  module V1
    class VenuesController < ApplicationController
      before_action :ensure_record, only: [:show, :update, :destroy]

      def show
        render json: record.as_json, status: 200
      end

      def index
        render json: Venue.all, status: 200
      end

      def create
        record.create!(allowed_params)
        render json: record.as_json, status: 202
      end

      def update
        record.update!(allowed_params)
        render json: record.as_json, status: 200
      end

      def destroy
        record.destroy
        render json: { message: :ok }, status: 200
      end

      private

      attr_reader :record

      def allowed_params
        params.require(:contact).permit(
          :name, :phone, :email, :comments, :contact_group_id,
          location_attributes: [:city, :state, :country, :zipcode, :street]
        )
      end

      def ensure_record
        @record = Venue.find(params[:id])
      end
    end
  end
end
