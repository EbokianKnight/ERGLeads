module Api
  module V1
    class EventsController < ApplicationController
      before_action :ensure_record, only: [:show, :update, :destroy]

      def show
        render json: record.as_json, status: 200
      end

      def index
        render json: Event.all, status: 200
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

      attr_reader :record, :venue

      def allowed_params
        params.require(:contact).permit(
          :date, :name, :description, :venue_id
        )
      end

      def ensure_venue
        @venue = Venue.find(params[:id])
      end

      def ensure_record
        @record = venue.find(params[:event_id])
      end
    end
  end
end
