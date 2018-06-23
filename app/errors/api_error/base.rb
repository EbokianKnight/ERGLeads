module ApiError
  class Base < StandardError
    attr_reader :status, :code, :info

    def initialize(code: nil, status: 500, message: nil, info: {})
      @code = code || 'something_went_wrong'
      @status = status
      @info = info
      @message = message
    end

    def message
      @message || code.titlecase
    end

    def as_json(*)
      Serialize::Errors::Base.new(self).as_json
    end
  end
end
