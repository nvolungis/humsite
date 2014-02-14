(function($){
  var $window = $(window);

  function MinHeight($el, options) {
    this.$el = $el;
    this.options = options;
    this.initialize();
  }

  $.extend(MinHeight.prototype, {
    initialize: function(){
      var that = this;

      $window.on('resize.minheight', function(){
        that.$el.css({
          'min-height': $window.height()
        });
      });

      $window.trigger('resize');
    },

    destroy: function(){
      $window.off('resize.minheight');
    }
  });


  $.fn.minheight = function(options) {
    this.each(function(i, el){
      var $el = $(el),
          minheight = $el.data('minheight');

      if(minheight) minheight.destroy();
      $el.data('minheight', new MinHeight($el, options));
    });
  }
}(jQuery))
