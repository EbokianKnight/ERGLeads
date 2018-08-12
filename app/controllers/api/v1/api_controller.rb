module Api
  module V1
    class ApiController < ApplicationController
      skip_before_action :verify_authenticity_token
      include ErrorHandler
    end
  end
end
