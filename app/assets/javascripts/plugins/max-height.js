(function($){
  var $window = $(window);

  function MaxHeight($el, options) {
    this.$el = $el;
    this.options = options;
    this.initialize();
  }

  $.extend(MaxHeight.prototype, {
    initialize: function(){
      var that = this;

      $window.on('resize.maxheight', function(){
        that.$el.css({
          'max-height': $window.height()
        });
      });

      $window.trigger('resize');
    },

    destroy: function(){
      $window.off('resize.maxheight');
    }
  });


  $.fn.maxheight = function(options) {
    this.each(function(i, el){
      var $el = $(el),
          maxheight = $el.data('maxheight');

      if(maxheight) maxheight.destroy();
      $el.data('maxheight', new MaxHeight($el, options));
    });
  }
}(jQuery))
