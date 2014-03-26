(function($){
  function ScrollTo($el, options){
    this.$el = $el;
    this.options = options;
    this.init();
  }

  $.extend(ScrollTo.prototype, {
    init: function(){
      this.bind();
    },

    bind: function(){
      this.$el.on('click', this.scrollto.bind(this));
    },

    scrollto: function(e){
      var id = this.$el.attr(this.options.attr),
          $target = $('body').find('#' + id),
          top = $target.offset().top - 18;

      $('html, body').animate({scrollTop: top + 'px'}, 500);

      e.preventDefault();
    }
  });


  $.fn.scrollto = function(options){
    var defaults = {
      attr: 'href'
    } 

    this.each(function(i, el){
      new ScrollTo($(el), $.extend({}, defaults, options));
    });
  }
  

}(jQuery));
