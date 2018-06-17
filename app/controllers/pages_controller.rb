class PagesController < ApplicationController
  def root
    @current_user = current_user
  end
end
