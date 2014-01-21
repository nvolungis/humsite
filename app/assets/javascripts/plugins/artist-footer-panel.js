(function($){
  var $window = $(window),
      p_name = 'artistpanel';

  var ArtistPanel = function($el, options) {
    this.$el = $el;
    this.options = options;
    this.initialize();
  };

  $.extend(ArtistPanel.prototype, {
    initialize: function(){
      this.build_ui();
      this.set_handlers();
      this.update_position();
    },

    build_ui: function(){
      this.ui = {
        more_info_button: $('.more-artist-info'),
        close: this.$el.find('.close')
      }
    },

    set_handlers: function(){
      $window.bind('resize', $.proxy(this.update_position, this));
      this.ui.more_info_button.bind('click', $.proxy(this.toggled, this));
      this.ui.close.bind('click', $.proxy(this.toggled, this));
    },

    update_size: function(){
    },

    toggled: function(){
      if(this.$el.data('active')){
        this.$el.data('active', false)
        this.$el.removeClass('active');
      }else {
        this.$el.data('active', true);
        this.$el.addClass('active');
      }

      this.update_position();
    },

    set_height: function(){
      this.height = this.$el.data('active') ? $window.height() - this.$el.height() : $window.height() - this.options.offset_height;
    },

    update_position: function(){
      this.set_height();
      this.$el.css({top: this.height + 'px'});
    }
  });


  $.fn.artistpanel = function(options){
    var defaults = {
      offset_height: 0
    };

    this.each(function(){
      var $el = $(this);

      new ArtistPanel($el, $.extend({}, defaults, options));
    });
  };
}(jQuery));
