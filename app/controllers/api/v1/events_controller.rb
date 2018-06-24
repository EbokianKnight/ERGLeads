module Api
  module V1
    class EventsController < ApplicationController
      before_action :ensure_record, only: [:show, :update, :destroy]

      def show
        render json: { event: record }, status: 200
      end

      def index
        render json: { events: Event }, status: 200
      end

      def create
        record.create!(allowed_params)
        render json: { event: record }, status: 202
      end

      def update
        record.update!(allowed_params)
        render json: { event: record }, status: 200
      end

      def destroy
        record.destroy
        render json: { event: nil }, status: 200
      end

      private

      attr_reader :record

      def allowed_params
        params.require(:event).permit(
          :date, :name, :description, :venue_id
        )
      end

      def ensure_record
        @record = Event.find(params[:event_id])
      end
    end
  end
end
