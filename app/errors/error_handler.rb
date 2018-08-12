module ErrorHandler
  def self.included(klass)
    klass.class_eval do

      rescue_from Exception, with: :unhandled_exception
      rescue_from StandardError, with: :unhandled_error
      rescue_from ApiError, with: :api_error
      rescue_from ActiveRecord::RecordNotFound, with: :not_found
      rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

      private

      def api_error(e)
        log_error(e)
        render_error(e)
      end

      def invalid_record(e)
        new_error = ApiError::ValidationFailed.new(e.record)
        render_error(new_error)
      end

      def log_error(e)
        source = caller_locations(1,1)[0]&.label&.titlecase
        Rails.logger.error "--------- #{source} ---------"
        Rails.logger.error "#{e.class}: #{e.message}"
        Rails.logger.error "#{Rails.backtrace_cleaner.clean(e.backtrace).join("\n")}"
        Rails.logger.error "-----------------------------"
      end

      def not_found(e)
        render_error(ApiError::NotFound.new)
      end

      def render_error(e)
        render json: e.as_json, status: e.status
      end

      def unhandled_error(e)
        log_error(e)
        new_error = ApiError::SomethingWentWrong.new(message: e.message)
        render_error(new_error)
      end

      def unhandled_exception(e)
        log_error(e)
        raise
      end
    end
  end
end
