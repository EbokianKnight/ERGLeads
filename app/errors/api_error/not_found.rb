module ApiError
  class NotFound < Base
    def initialize(code: 'not_found', status: 404)
      super(code: code, status: status)
    end
  end
end
