class PagesController < ApplicationController
  def root
    @current_user = current_user
    @venues = Venue.all.as_json
  end
end
