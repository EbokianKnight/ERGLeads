module ApiError
  class ValidationFailed < Base
    attr_reader :record

    def initialize(record)
      @record = record
      super(code: 'validation_failed', status: 400)
    end

    def as_json(*)
      Serialize::Errors::Validations.new(self).as_json
    end
  end
end
