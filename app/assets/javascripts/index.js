(function($) {
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

    $('.work-image img').fullHeightImage();

    $('.work-image').maxheight();

    $('.artist-panel').artistpanel();

    $('.work-item .meta').togglebutton({
      button: '.info-icon'
    });

    /*
     *$('.artist-panel').togglebutton({
     *  button: '.circular'
     *});
     */
  });
}(jQuery))
