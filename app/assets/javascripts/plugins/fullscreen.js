(function($){
  var $window = $(window);
  
  function Fullscreen($els, options){
      this._$els = $els;
      this.options = options;
      this.initialize();
    };

    $.extend(Fullscreen.prototype, {
      initialize: function(){
        this.set_handlers();
        $window.trigger('resize');
      },

      set_handlers: function(){
        $window.on('resize', $.proxy(this.set_height, this)); 
        $window.on('full:screen:changed', $.proxy(this.set_status_class, this));
        $window.on('size:options:toggled', $.proxy(this.set_height ,this));
      },

      set_height: function(){
        var height = $window.height(),
            that = this;

        this._$els.each(function(i, el){
          var $el = $(el),
              height = that.get_height($el);

          $el.css(that.options.attr, height);
        });
      },

      get_height: function($el){
        var offset = $el.data('subtractor') ? $($el.data('subtractor')).height() : 0;
        return $window.height() - offset;
      }
    });

    $.fn.fullscreen = function(options){
      var defaults = { attr: 'height' },
          options = $.extend({}, defaults, options),
          $els = this;

      new Fullscreen($els, $.extend({}, defaults, options));
    };
}(jQuery));

