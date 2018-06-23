class ExceptionMailer < ApplicationMailer
  def send_error_to_maintainers(error, user, request)
    unless dev_mailing_addresses.empty?
      setup(error, user, request)
      report_error.deliver!
    end
  rescue => e
    Rails.logger.error "Reporting Failed with #{e.message}"
  end

  private

  def dev_mailing_addresses
    @mail ||= User.devs.pluck(:email)
  end

  def report_error
    mail(
      from: dev_mailing_addresses.first,
      subject: "Error on #{@app} #{@env} - #{@error.message}",
      to: dev_mailing_addresses
    )
  end

  def setup(error, user, request)
    @app = Rails.application.class.parent_name
    @env = Rails.env
    @error = error
    @user = user
    @request = request
  end
end
