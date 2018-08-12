module Serialize
  module Errors
    class Base < Presenter
      def as_json(*)
        {
          code: 'base_error',
          status: @object.status,
          errors: package_errors
        }
      end

      private

      def api_display_message
        I18n.t(
          @object.code,
          scope: [:errors, :base],
          locale: :api,
          default: @object.message
        )
      end

      def package_errors
        [{
          code: @object.code,
          message: api_display_message
        }]
      end
    end
  end
end
