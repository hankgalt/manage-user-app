class ApplicationController < ActionController::API
  def fallback_index_html
    puts "\n\nApplicationController.fallback_index_html()\n\n"
    render :file => 'public/index.html', layout: false
  end
end
