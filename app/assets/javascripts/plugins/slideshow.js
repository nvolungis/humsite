(function($){

    /* Slideshow
     ***********************************/

		var Slideshow = function(el, options){
      this._$el = $(el);
			this.options = options;
			this.initialize();
		};
		
		$.extend(Slideshow.prototype, {
			initialize: function(){
				this.slides = new Slides(this._$el.find(this.options.slides), this._$el, this.options);
				this.$panel = this.options.container;

        if(this.options.dots)             this.dots = new Dots(this._$el.find(this.options.slides), this._$el, {thumbnails: this.options.thumbnails, dot_container: this.options.dot_container}, this.options);
        if(this.options.arrows)           this.arrows = new Arrows(this._$el.find(this.options.slides), this._$el, this.options);
        if(this.options.type === 'slide') this.setup_slide();
        if(this.options.type === 'fade')  this.setup_fade();

        this.set_handlers();
        if(this.options.loader){
          new Loader(this._$el, $.proxy(this.start, this), this.options);
        }else{
          this.start();
        }
			},
			
      setup_slide: function(){
        this.$panel.css({
          width:this.slides.length() * 100 + '%',
          overflow: 'hidden',
          position: 'relative',
          '-webkit-transition' : 'left 1s ease',
          '-moz-transition' : 'left 1s ease',
          'transition' : 'left 1s ease'
        });

        $el.css({overflow: 'hidden'});
      },

      setup_fade: function(){
        if(this.options.sizing !== 'window') return;

        var aspect_ratio = this.slides.aspect_ratio(),
            that = this;

        $(window).bind('resize', function(){
          that.set_wrapper_size(aspect_ratio);
        });

        $(window).bind('slide:image:loaded', function(){
          aspect_ratio = that.slides.aspect_ratio();
          that.set_wrapper_size(aspect_ratio);
        });


        this.$panel.css({'position': 'relative'});
        this.set_wrapper_size(aspect_ratio);
      },

      set_wrapper_size: function(ar){
        var subtractor = this.options.sizing_width_subtractor ? this.options.sizing_width_subtractor.width() : 0,
            width = this.options.sizing_ref.width() - subtractor,
            height = Math.floor(width/ar)-1;

        this.$panel.css({
          'width':width+'px',
          'height': height+'px'
        });
      },

      set_handlers: function(){
        var that = this;

        this._$el.on('dot:clicked', function(e, index){
          that.stop();
          that.go_to(index);
          that.options.onDotClicked(parseInt(index) + parseInt(1), that.slides.find_slide_by_index(index));
        });

        this._$el.on('slide:clicked', function(){
          that.stop();
          that.next();
          that.options.onSlideClicked(parseInt(that.slides.get_current_index()) + parseInt(1));
        });

        this._$el.on('arrow:clicked', function(e, data){
          that.stop();
          that[data.direction]();
          that.options.onArrowClicked(data.direction, parseInt(that.slides.get_current_index()) + parseInt(1));
        });

        this._$el.on('set:aspect:ratio', function(e, ar){
          that.set_wrapper_size(ar);
        });
      },
			
			update_position: function(index){
				this.$panel.css({left: -index * 100 + '%'});
			},

      notify_application: function(index){
        this._$el.trigger('new:slide', index); 
        this.options.onChange.call(this, index, this.slides.find_slide_by_index(index), this._$el);
      },

      loader: function(){
        this.start();
      },
			
			start: function(){
				var that = this;
				
        this.go_to(0);
        if(!this.options.autoslide) return;

				this.interval = setInterval(function(){
				  that.next();
        }, this.options.interval);
        
        $(window).trigger('images:loaded');
			},

      next: function(){
        var new_index = this.slides.next();
        this.go_to(new_index);
			},

      prev: function(){
        var new_index = this.slides.prev();
        this.go_to(new_index);
			},


      go_to: function(index){
        if(this.options.type === 'slide') this.update_position(index);
        if(this.options.type === 'fade')  this.slides.show(index);
        this.notify_application(index);
      },

      stop: function(){
        if(this.interval) clearInterval(this.interval);
      }
		});





		


    /* Slides
     ***********************************/

		var Slides = function(slides, $el, options){
      this.options = options;
      this._$el = $el;
			this._current_index = 0;
			this._$slides = slides;
      this._$first_image = this._$slides.first().find('img');
			this.initialize();
		};
		
		$.extend(Slides.prototype, {
			initialize: function(){
				this.set_indicies();
        this.set_handlers();
        this.load_first_image();

        if(this.options.type == 'slide') this.setup_slide();
        if(this.options.type == 'fade')  this.setup_fade();
        if(this.options.sizing == 'background') this.setup_background_images();
        if(this.options.click) this.setup_click();
			},
		
			length: function(){
				return this._$slides.length;
			},

      load_first_image: function(){
        this._$first_image.on('load', function(){
          $(window).trigger('slide:image:loaded');
        });
      },

      aspect_ratio: function(){
        var h = this._$first_image.css('height'),
            w = this._$first_image.css('width');

        return parseInt(w) / parseInt(h)
      },
		
			get_current_index: function(){
				return this._current_index;
			},
			
			set_current_index: function(index){
				this._current_index = index;
			},
			
			set_indicies: function(){
				this._$slides.each(function(i, slide){
					$(slide).attr({'data-index':i});
				});
			},
			
      setup_slide: function(){
        this._$slides.css({
          width: 100 / this.length() + '%' ,
          float: 'left'
        });
      },

      setup_fade: function(){
        this._$slides.css({
          width: '100%',
          position: 'absolute'
        });

        this.init_fade();
      },

      init_fade: function(){
        this._$slides.hide();
        this._$slides.first().show();
      },

      setup_background_images: function(){
        var that = this;
        this._$slides.each(function(i, slide){
          var $img   = $(slide).find('img'),
              bkg    = 'url("'+$img.attr('src')+'") '+ that.options.positioning +' no-repeat';

          $(slide).css({
            'background':bkg,
            'background-size':'cover',
            'height': '100%',
            'width': '100%'
          });

          $img.hide();
        });
      },

      setup_click: function(){
        this._$el.tooltip();
      },
			
			find_slide_by_index: function(index){
				return this._$slides.filter('[data-index='+index+']');
			},
			
			slide_exists: function(index){
				return this.find_slide_by_index(index).length ? true : false;
			},
			
			next: function(){
				var next = this.slide_exists(this.get_current_index() + 1) ? this.get_current_index() + 1 : 0;
	
				this.set_current_index(next); 
				return next;
			},
			
			prev: function(){
				var previous = this.slide_exists(this.get_current_index() - 1) ? this.get_current_index() - 1 : 0;
	
				this.set_current_index(previous); 
				return previous;
			},

      set_handlers: function(){
        var that = this;

        this._$el.on('dot:clicked', function(e, index){
          that._current_index = index;
        });

        if(this.options.click){
          this._$slides.parent().fastclick(function(e){
            that._$el.trigger('slide:clicked');
          });
        }
      },

      deactivate: function(){
        this._$slides.filter('.active').removeClass('active').fadeOut(this.options.transition); 
      },

      activate: function(index){
        this.find_slide_by_index(index).addClass('active').fadeIn(this.options.transition);
      },

      show: function(index){
        this.deactivate();
        this.activate(index);
      }
		});



    /* Dots
     ***********************************/

    var Dots = function(slides, $el, options, slideshow_options){
      this._$slides = slides;
      this._$el = $el;
      this._options = options;
      this._slideshow_options = slideshow_options;
      this._$container = $(options.dot_container);
      this.initialize();
    };

    $.extend(Dots.prototype, {
      initialize: function(){
        this.make_dots();
        this.set_handlers();
      },

      make_dots: function(){
        var that = this,
            classes = this._options.thumbnails ? 'dots thumbs' : 'dots';

        this._$container.find('.dots').remove();
        this._$container.append($('<ul class="'+classes+'"></ul>'));
        this._$dots = this._$container.find('.dots');

        this._$slides.each(function(i, slide){
          var $dot = $('<li data-index="'+ i +'"></li>');
          if(that._options.thumbnails) that.add_thumb($(slide), $dot);
          that._$dots.append($dot);
        });
      },

      add_thumb: function($slide, $dot){
        var $img = $slide.find('img').clone();
        $dot.append($img);
      },

      set_handlers: function(){
        var that = this;
        if($.fn.hammer){
          this._$dots.hammer();
          this._$dots.delegate('li', 'tap', function(e){
            that.notify_app(e);
          });
        }else{
          this._$dots.delegate('li', 'click', function(e){
            that.notify_app(e);
          });
       }

        this._$el.on('new:slide', function(e, index){
          that.activate(index);
        });
      },

      notify_app: function(e){
        var index = $(e.currentTarget).attr('data-index');
        this._$el.trigger('dot:clicked', index);
      },

      activate: function(index){
        this._$dots.find('.active').removeClass('active');
        this._$dots.find('[data-index='+ index +']').addClass('active');
      }
    });






   /* Thumbnails
   ***********************************/

    var Thumbnails = function(slides, $el){
      this._$slides = slides;
      this._$el = $el;
      this.initialize();
    };

    $.extend(Thumbnails.prototype, {
      initialize: function(){
        this.make_arrows();
      }
    });







    /* Arrows 
     ***********************************/

    var Arrows = function(slides, $el, options){
      this.slides = slides;
      this.$el = $el;
      this.options = options;
      this.initialize();
    }

    $.extend(Arrows.prototype, {
      initialize: function(){
        this.make_arrows();
        this.set_handlers();
      },

      make_arrows: function(){
        var arrows = '<ul class="arrows">'
                   + '<li class="arrow-prev" data-direction="prev"><span class="icon-wedge-left"></span></li>'
                   + '<li class="arrow-next" data-direction="next"><span class="icon-wedge-right"></span></li>'
                   + '</ul>';

        this.$el.append(arrows);
        this.$arrows = this.$el.find('.arrows');
      },

      set_handlers: function(){
        var that = this;
        this.$arrows.delegate('li', 'click', function(e) {
          var $target = $(e.currentTarget),
              direction = $target.data('direction');

          that.$el.trigger('arrow:clicked', {direction:direction});
        });

      }
    });



    /* Loader 
     ***********************************/
    
    var Loader = function($el, callback, options){
      this.$el = $el;
      this.options = options;
      this.callback = callback;
      this.initialize();
    };

    $.extend(Loader.prototype, {
      initialize: function(){
        var that = this,
            fired = false;

        if($.fn.waitForImages){
          this.show();
          this.$el.waitForImages(function(){

          }, function(loaded, count, success){
            if(loaded >= count && !fired){
              that.hide();
              that.callback();
              fired = true;
            }
          },false);
        } else {
          that.callback();
        }
      },

      show: function(){
        var markup = this.get_markup(),
            $loader_container = $(this.options.loader_container);

        this.add_slides_styles();
        $loader_container.css({'position': 'relative'});
        this.$el.trigger('set:aspect:ratio', 1.6667);
        $loader_container.append(markup);
        this.$el.addClass('loading');
      },

      hide: function(){
        this.$el.find('#slideshow-loader').remove();
        this.remove_slides_styles();
        this.$el.removeClass('loading');
      },

      get_markup: function(){
        var markup = '',
            img = $('#loader img').attr('src');

        markup += '<div id="slideshow-loader" class="loader">';
        markup += '<div class="table-wrapper">';
        markup += '<div class="table-cell">';
        markup += '<img src=' + img + ' />';
        markup += '</div>';
        markup += '</div>';
        markup += '</div>';

        var $el = $(markup);
        this.add_loader_styles($el);
        return $el;
      },

      add_slides_styles: function($el) {
        var $el = $(this.options.container);

        $el.css({
          opacity: 0,
          '-webkit-transition' : 'opacity 1s ease',
          '-moz-transition' : 'opacity 1s ease',
          'transition' : 'opacity 1s ease' 
        });
      },

      remove_slides_styles: function(){
        var $el = $(this.options.container);

        $el.css({
          opacity: 1
        });

        setTimeout(function(){
          $el.css({
            '-webkit-transition' : 'none',
            '-moz-transition' : 'none',
            'transition' : 'none' 
          });
        },1000);
      },

      add_loader_styles: function($el) {
        $el.css({
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          'z-index': 10,
          'text-align': 'center'
        });
      }
    });




			
  $.fn.slideshow = function(options){
    var defaults = {
        interval: 4000,
        transition: 1000,
        slides: 'li',
        dots: true,
        thumbnails: false,
        type: 'slide',
        sizing: 'window',            //window, container, background,
        sizing_ref: $(window),
        sizing_width_subtractor: null,
        positioning: 'center center',
        autoslide: true,
        click: true,
        arrows: false,
        loader: false,
        loader_container: this,
        analytics_name: false,
        onChange: function(){},
        onDotClicked: function(){},
        onArrowClicked: function(){},
        onSlideClicked: function(){}
      };

    this.each(function(i,el){
      new Slideshow(el, $.extend({
        container: $(el),
        dot_container: $(el)
      }, defaults, options));
    });
  }
}(jQuery));

