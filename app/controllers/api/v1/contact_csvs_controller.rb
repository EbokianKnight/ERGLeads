require 'csv'

module Api
  module V1
    class ContactCsvsController < ApiController
      def index
        respond_to do |format|
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
        Contact.where(id: contact_ids, connectable_type: 'Venue')
          .includes(:location)
          .joins('LEFT OUTER JOIN venues ON venues.id = contacts.connectable_id')
          .joins('LEFT OUTER JOIN locations ON venues.id = locations.addressable_id')
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
            contact.email || contact&.connectable&.email
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

      def contact_ids
        params.permit(:format, contact_ids: [])[:contact_ids] || []
      end
    end
  end
end
