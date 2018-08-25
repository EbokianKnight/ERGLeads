module DeviseHelper
  def devise_error_messages!
    return "" unless devise_error_messages?
    binding.pry

    messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join
    # sentence = I18n.t("errors.messages.not_saved",
    #                   :count => resource.errors.count,
    #                   :resource => resource.class.model_name.human.downcase)
    # <h2>#{sentence}</h2>

    html = <<-HTML
    <div id='error_explanation' class='has-errors'>#{messages}</div>
    HTML

    html.html_safe
  end

  def devise_error_messages?
    !resource.errors.empty?
  end

end
