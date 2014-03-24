(function($){
  var win = $(window);

  function ScreenTest($el, options){
    this.$el = $el;
    this.options = options;
    this.init();
  }

  $.extend(ScreenTest.prototype, {
    in_view_on_last_test: false,
      
    init: function(){
      this.set_bounds();
      this.bind();
    },

    bind: function(){
      win.on('resize.screentest', this.set_bounds.bind(this));
      win.on('scroll.screentest resize.screentest', this.test.bind(this));    
    },

    unbind: function(){
      win.off('resize.screentest scroll.screentest');        
    },
    
    test: function(){
      var viewport = this.get_viewport(),
          in_view = !(viewport.bottom < this.bounds.top || viewport.top > this.bounds.bottom);
      
      if(in_view && !this.in_view_on_last_test){
        this.options.enter(this.$el);
        this.in_view_on_last_test = true; 
        // if(this.options.unbind_on_enter) this.unbind();
      }else if( !in_view && this.in_view_on_last_test) {
        this.options.leave(this.$el);
        this.in_view_on_last_test = false;
      }
    },

    set_bounds: function(){
      this.bounds = this.get_bounds();
    },

    get_bounds: function(){
      var bounds = this.$el.offset();
      bounds.bottom = bounds.top + this.$el.height();
      return bounds;
    },

    get_viewport: function(){
      var viewport = {};
      viewport.top = win.scrollTop(),
      viewport.bottom = viewport.top + win.height();
      return viewport;
    }
  });

  $.fn.screentest = function(options){
    var defaults = {
      enter: function(){},
      leave: function(){},
      unbind_on_enter: false
    };

    this.each(function(){
      var $el = $(this);

      new ScreenTest($el, $.extend({}, defaults, options));
    });
  }
}(jQuery));
