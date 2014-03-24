(function($){
  var $window = $(window);
  
  function LazyImage($el, options){
    this.$el = $el;
    this.$parent = $el.parent();
    this.aspect_ratio = this.$el.attr('data-aspect-ratio');
    this.options = options;
    this.init();
  }

  $.extend(LazyImage.prototype, {
    init: function(){
      this.calculate_dimensions();
      this.resize_placeholder();
      this.bind();
    },
   
    bind: function(){
      $window.on('resize.lazyimage', this.resize_placeholder.bind(this));      

      this.$el.screentest({
        enter: function(){
          this.$el.trigger('image:in:view');
        }.bind(this)
      });

      this.$el.on('image:in:view', function(){
        this.load_image();
      }.bind(this));
    },

    unbind: function(){
      $window.off('resize.lazyimage'); 
      this.$el.off('image:in:view');
    },

    destroy: function(){
      this.unbind();
      this.$el.css({
        height: 'auto',
        width: '100%'
      });
    },

    insert_image: function($image){
      $image.hide();
      this.$el.append($image.fadeIn(750, function(){
        this.destroy();
        this.options.on_insert(this.$el);
      }.bind(this)));
    },

    resize_placeholder: function(){
      this.calculate_dimensions();
      this.$el.css({
        width: this.width,
        height: this.height
      });
    },

    calculate_dimensions: function(){
      this.width = this.$parent.width();
      this.height = parseFloat(this.width) / parseFloat(this.aspect_ratio);
    },

    load_image: function(){
      var $img = $('<img />');

      $img.on('load', function(){
        this.insert_image($img);
        this.unbind();
      }.bind(this));

      $img[0].src = this.$el.attr('data-url')
    }
  });


  $.fn.lazyimage = function(options){
    var defaults = {
      on_insert: function(){}
    };

    this.each(function(i, el){
      new LazyImage($(el), $.extend({}, defaults, options));
    });
  };


}(jQuery));
