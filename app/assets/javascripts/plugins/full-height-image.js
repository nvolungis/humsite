(function($){
  var $window = $(window);

  function FullHeightImage($el, options) {
    this.$el = $el;
    this.aspectRatio();
    this.options = options;
		this.$ref = $(options.reference);
    this.initialize();
  }

  $.extend(FullHeightImage.prototype, {
    initialize: function(){
      var that = this;

      $window.on('resize.fullheightimage', function(){
        that.$el.css({
          'height': that.$ref.height(),
          'left': -((that.$ref.height() * that.aspectRatio()) - that.$ref.width()) / 2
        });
      })

      this.$el.css({
        position: 'relative'
      });

      $window.trigger('resize');
      this.$el.on('load', function(){
				$window.trigger('resize');
			});
    },

    aspectRatio: function(){
      return this.ar = this.ar != 0 ? this.$el.width() / this.$el.height() : this.ar;
    },

    destroy: function(){
      $window.off('resize.fullheightimage');
    }
  });


  $.fn.fullHeightImage = function(options) {
    this.each(function(i, el){
      var $el = $(el),
          image = $el.data('image'),
				  defaults = {
						reference: window,
						subtractor: function(){}
					};

      if(image) image.destroy();
      $el.data('image', new FullHeightImage($el, $.extend({}, defaults, options)));
    });
  }
}(jQuery))
