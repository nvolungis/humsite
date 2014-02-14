(function($){
  var win = $(window);

  function StickyBackgroundSection($el, options){
    this.options = options;
    this.$el = $el;
    this.$images = $(this.options.images);
    this.$spacers = $(this.options.spacers);
    this.init();
  }

  $.extend(StickyBackgroundSection.prototype, {
    init: function() {
      if(!this.$images.length) return;
      this.$container = this.build_image_container();
      $('body').append(this.$container);

      try {
        this.$spacers.fullscreen();
        this.$images.css('opacity', 0);
        this.$images.screentest({
          enter: this.set_background_image.bind(this)
        })
      }

      catch(err) {
        console.log(err);
      }
    },

    build_image_container: function(){
      var $container = $('<div id="sticky-image-container" />');                     
      $container.css({
        'position': 'fixed',
        'top': 0,
        'bottom':0,
        'left':0,
        'right':0,
        'z-index': 1,
        'background-position': 'center center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      });

      return $container;
    },

    set_background_image: function($el){
      this.$container.css('background-image', $el.css('background-image'));
    }
  });


  $.fn.stickyBackgroundSection = function(options){
    var defaults = {
      images: '[data-role=sticky-image]',
      spacers: '[data-role=sticky-spacer]'
    };

    this.each(function(){
      var $el = $(this);

      new StickyBackgroundSection($el, $.extend({}, defaults, options));
    });
  };

}(jQuery));
