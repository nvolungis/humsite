(function($){
  $.fn.fullscreen = function(options){
    var $window = $(window),
        $els = $('.fullscreen'),
        defaults = {};

    var Fullscreen = function(options){
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
              height = that.get_height($el),
              min_height = that.get_min_height($el);

          that.test_height_relation(height, min_height, $el);
          that.test_applicability($el, height, function(height){
            $el.css({
              height: height,
              'min-height' : min_height + 'px'
            });
          });
        });
      },

      test_applicability: function($el, height, cb){
        var min_width = parseInt($el.data('width-cutoff')),
            width = parseInt($window.width()),
            height = (width < min_width) ? 'auto' : height + 'px';
        
        cb(height); 
      },

      get_height: function($el){
        var offset = $el.data('subtractor') ? $($el.data('subtractor')).height() : 0;
        return $window.height() - offset;
      },

      get_min_height: function($el) {
        return $el.data('min-height') ? $($el.data('min-height')).height() + 40 : 0;
      },

      test_height_relation: (function(){
        var state = '';

        return function(height, min_height, $el){
          if(height < min_height && state != 'below'){
            $window.trigger('full:screen:changed', {state:'below', el:$el});
            state = 'below';
          }else if (height > min_height && state != 'above'){
            $window.trigger('full:screen:changed', {state:'above', el:$el});
            state = 'above';
          }
        }
      }()),

      set_status_class: function(e, data){
        data.el.removeClass('above below').addClass(data.state);
      }
    });

    options = $.extend({}, defaults, options);
    new Fullscreen(options);
  };
}(jQuery));

