require 'csv'

module Api
  module V1
    class ContactCsvsController < ApiController
      def index
        respond_to do |format|
          binding.pry
          format.json do
            render json: { csv: [csv_header].concat(rows) }, status: 200
          end
          format.csv do
            send_data(
              package_csv,
              type: 'text/csv; charset=utc-8; header=present',
              disposition: "attachment; filename='contact_list_#{DateTime.now.to_s}.csv'"
            )
          end
        end
      end

      private

      def csv_header
        %w[
          first_name last_name venue_name job_title
          mailing_address1 mailing_address2 mailing_city mailing_state
          mailing_country mailing_zip email_address
        ]
      end

      def rows
        contact_rows + contactless_venue_rows
      end

      def contact_rows
        Contact.where(id: contact_ids)
          .includes(:location, connectable: [:location])
          .map do |contact|
          [
            contact.first_name,
            contact.last_name,
            contact.connectable&.name,
            contact.job_title,
            contact.location&.street || contact.connectable&.location&.street,
            contact.location&.street2 || contact.connectable&.location&.street2,
            contact.location&.city || contact.connectable&.location&.city,
            contact.location&.state || contact.connectable&.location&.state,
            contact.location&.country || contact.connectable&.location&.country,
            contact.location&.zipcode || contact.connectable&.location&.zipcode,
            contact.email || contact&.connectable&.email,
          ]
        end
      end

      def contactless_venue_rows
        Venue.where(id: venue_ids).includes(:location).map do |venue|
          [
            nil,
            nil,
            venue.name,
            nil,
            venue.location&.street,
            venue.location&.street2,
            venue.location&.city,
            venue.location&.state,
            venue.location&.country,
            venue.location&.zipcode,
            venue.email,
          ]
        end
      end

      def package_csv
        bom = "\xEF\xBB\xBF"
        csv_body = CSV.generate do |csv|
          csv << csv_header
          rows.each { |row| csv << row }
        end
        bom + csv_body
      end

      def all_ids
        params.permit(:format, contact_ids: [])[:contact_ids] || []
      end

      def contact_ids
        all_ids.each.with_object([]) do |id, ids|
          ids << id.to_i if id.to_s.match?(/^\d+$/)
        end
      end

      def venue_ids
        all_ids.each.with_object([]) do |id, ids|
          ids << id.match(/\d+/)[0].to_i if id.to_s.match?(/v/)
        end
      end
    end
  end
end
