(function($) {
  $(document).on('page:before-change', function(){
    // $('#samplings').slideshow('destroy');
    // $('.fullscreen').fullscreen('destroy');
    // $('.min-height').fullscreen('destroy');
    // $('#site-header').togglebutton('destroy');
    // $(window).stickyBackgroundSection('destroy');
  });

  $(document).on('ready page:load', function(){
    $('#samplings').slideshow({
      container:$('#samplings ul'),
      type: 'fade',
      transition: 800,
      interval: 6000,
      sizing: 'background',
      click:false,
      onChange: function(index, slide){
        var color = $(slide).data('color');
        $('#issue-label').css({color: '#' + color});
      }
    });

    $('#issue-label').fitText(.9);

    $('.fullscreen').fullscreen();
    $('.min-height').fullscreen({
      attr: 'min-height'
    });

    $('.lazy-image').lazyimage({
      on_insert: function($el) {
        $el.find('img').imgViewer();
      }
    });

    $('#site-header').togglebutton({
      button: '#menu',
      click_close: '.close'
    });

    $('.artist-info').togglebutton({
      button: '.artist-expand',
      class_name: 'expanded',
      on_open: function(){
        var top = $('#artist-panel').offset().top;

        $('html, body').animate({scrollTop: top}, 300);
      }
    });

    $('.lazy-image img').imgViewer({
      js_animate: false
    });

    $(window).sectionscroll();

    $(window).stickyBackgroundSection({
      images: '[data-role=sticky-image]',
      spacers: '[data-role=sticky-spacer]'
    });
  });
}(jQuery))
