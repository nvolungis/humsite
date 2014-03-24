module ApplicationHelper
  def lazy_image url, aspect_ratio = 1
    raw "<div class='lazy-image' data-aspect-ratio='#{aspect_ratio}' data-url='#{url}'></div>"
  end

  def open_display_table
    raw "<div class='table-wrapper'><div class='table-cell'>"
  end

  def close_display_table
    raw "</div></div>"
  end

  def link_with_target_text target
    if target.include? 'http'
      text = target.to_s.gsub('http://', '');
      link = target
    else
      text = target
      link = "http://#{target}"
    end

    raw link_to text, link
  end
end
