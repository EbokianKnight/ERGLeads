module Api
  module V1
    class VenuesController < ApiController
      before_action :ensure_record, only: [:show, :update, :destroy]

      def show
        render json: { venue: record }, status: 200
      end

      def index
        render json: { venues: present_records }, status: 200
      end

      def create
        Venue.create!(allowed_params)
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
        Serialize::Models::Venue::Index.new(Venue.order(:name).includes(:location))
      end

      def allowed_params
        params.fetch('venue', {}).permit(
          :name, :phone, :email, :comments, :contact_group_id, :website, :kind,
          :other_kind, :comments, :ext,
          location_attributes: [:city, :state, :country, :zipcode, :street, :street2]
        )
      end

      def ensure_record
        @record = Venue.find(params[:id])
      end
    end
  end
end
