module Serialize
  module Errors
    class Validations < Serialize::Errors::Base

      def as_json(*)
        super.merge(errors: package_errors)
      end

      private

      # uses the base methods to build the standard error format,
      # replaces the typical one error array with an error for each failure.
      def package_errors
        @object.record.errors.details.map do |attribute, errors|
          errors.map do |detail|
            serialize(attribute, detail)
          end
        end.flatten
      end

      # builds the individual validations
      def serialize(attribute, detail)
        denested = attribute.to_s.gsub(/.+\./, '')
        error_code = build_error_code(denested, detail[:error])
        {
          resource: resource,
          parameter: parameter(attribute),
          code: error_code,
          message: build_error_message(denested, error_code, detail)
        }
      end

      # concatonates the model with the error's symbol to create an error code
      def build_error_code(attribute, error)
        :"#{attribute}_#{error}"
      end

      # attempts to lookup the error in the api.yml
      def build_error_message(attribute, error_code, detail)
        display = I18n.t(
          error_code,
          scope: [:errors, :validations],
          locale: :api,
          default: "#{parameter(attribute).titlecase} #{code_default(detail)}"
        )
      end

      # defines a global message response for a given error code
      def code_default(detail)
        I18n.t(
          detail[:error],
          scope: [:errors, :default_messages],
          locale: :api,
          default: detail[:error].to_s
        )
      end

      # provides a method to alias a attribute on the model in the response
      def parameter(attribute)
        I18n.t(
          attribute,
          scope: [:fields, underscored_resource_name],
          locale: :api,
          default: attribute.to_s
        )
      end

      # provides a method to alias a model's name in the response
      def resource
        I18n.t(
          underscored_resource_name,
          scope: [:resources],
          locale: :api,
          default: @record.class.to_s.titlecase
        )
      end

      # standardizes the model location as a searchable key
      def underscored_resource_name
        @object.record.class.to_s.gsub('::', '').underscore
      end
    end
  end
end
