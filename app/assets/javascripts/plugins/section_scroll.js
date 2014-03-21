(function($){
  var $window = $(window);

  function SectionScroll($el, options){
    this.$el = $el;
    this.options = options;
    this.init();
  };

  $.extend(SectionScroll.prototype, {
    init: function(){
      var reference_point = 20;
      this.$wrapper = $('.section-scroll-wrapper');
      this.gather_data();
      this.bind();    
    },

    gather_data: function(){
      var that = this;
      this.sections = [];

      $('.section-scroll-section').each(function(){
        that.sections.push(new Section($(this)));
      });
    },

    bind: function(){
      $window.on('scroll.sectionScroller', function(){
        var scrolltop = $window.scrollTop() + 40;
        this.update_percentages(scrolltop);
      }.bind(this));
    },

    update_percentages: function(scrolltop){
      for(var i in this.sections) {
        this.sections[i].progress(scrolltop);
      }
    }
  });

  function Section($el){
    this.$el = $el;
    this.id = $el.attr('id');
    this.$nav_item = $('[data-section=' + this.id + ']');
    this.active = false;
    this.toggleActive();
    this.set_vals();
  };

  $.extend(Section.prototype, {
    set_vals: function(){
      this.height = this.$el.height();
      this.lower_bound = this.$el.offset().top;           
      this.upper_bound = this.lower_bound + this.height;
    }, 

    progress: function(scrolltop){
      var offset_lower = scrolltop - this.lower_bound;

      if(scrolltop < this.lower_bound && this.active) {
        this.toggleActive();
        this.set_percentage(0);
      }

      if(scrolltop > this.upper_bound && this.active) {
        this.toggleActive();
        this.set_percentage(100); 
      }
      
      if(scrolltop > this.lower_bound && scrolltop <= this.upper_bound){
        if(!this.active){
          this.toggleActive();
        }

        percentage = (scrolltop - this.lower_bound) / this.height * 100;
        this.set_percentage(percentage);
      }
    },

    toggleActive: function(){
      this.active = !this.active;          

      if(this.active){
        this.$nav_item.addClass('active');
      }else{
        this.$nav_item.removeClass('active');
      }
    },

    set_percentage: function(percentage){
      this.$nav_item.find('.sticky-item-progress-indicator').width(percentage + '%');
    }
  });

  $.fn.sectionscroll = function(options){
    var defaults = {};

    this.each(function(){
      new SectionScroll($(this), $.extend({}, defaults, options));
    });
  };
}(jQuery));
