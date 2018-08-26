module Api
  module V1
    class VenueGroupsController < ApiController
      before_action :ensure_record, only: [:show, :update, :destroy]

      def show
        render json: { venue_group: record }, status: 200
      end

      def index
        render json: { venue_groups: present_records }, status: 200
      end

      def create
        record = VenueGroup.new(allowed_params)
        record.save!
        render json: { venue_group: record }, status: 202
      end

      def update
        record.update!(allowed_params)
        render json: { venue_group: record }, status: 200
      end

      def destroy
        record.destroy
        render json: { venue_group: nil }, status: 200
      end

      private

      attr_reader :record

      def present_records
        Serialize::Models::VenueGroup::Index.new(VenueGroup.order(:name))
      end

      def allowed_params
        params.fetch('venue_group', {}).permit(
          :name, :phone, :email, :comments, :website, :ext,
          location_attributes: [:city, :state, :country, :zipcode, :street, :street2]
        )
      end

      def ensure_record
        @record = VenueGroup.find(params[:id])
      end
    end
  end
end
