module Api
  module V1
    class VenuesController < ApplicationController
      before_action :ensure_record, only: [:show, :update, :destroy]

      def show
        render json: { venue: record }, status: 200
      end

      def index
        render json: { venues: present_records }, status: 200
      end

      def create
        record.create!(allowed_params)
        render json: { venue: record }, status: 202
      end

      def update
        record.update!(allowed_params)
        render json: { venue: record }, status: 200
      end

      def destroy
        record.destroy
        render json: { venue: nil }, status: 200
      end

      private

      attr_reader :record

      def present_records
        Serialize::Models::Venue::Index.new(Venue.order(:name))
      end

      def allowed_params
        params.require(:venue).permit(
          :name, :phone, :email, :comments, :contact_group_id, :website,
          location_attributes: [:city, :state, :country, :zipcode, :street]
        )
      end

      def ensure_record
        @record = Venue.find(params[:id])
      end
    end
  end
end
