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
              disposition: "attachment; filename='contact_list_#{DateTime.now.to_s}'"
            )
          end
        end
      end

      private

      def csv_header
        %w[first_name last_name mailing_address job_title email_address country state city venue_name]
      end

      def rows
        Contact.where(id: contact_ids).map do |contact|
          [
            contact.first_name,
            contact.last_name,
            contact.job_title,
            contact.location&.address || contact.connectable&.location&.address,
            contact.email || contact&.connectable&.email,
            contact.location&.country || contact.connectable&.location&.country,
            contact.location&.state || contact.connectable&.location&.state,
            contact.location&.city || contact.connectable&.location&.city,
            contact.connectable&.name
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
