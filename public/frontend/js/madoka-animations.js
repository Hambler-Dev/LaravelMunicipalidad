$(document).ready(function(){
  $('.bar').fadeOut(0);
  $('.brand-logo-alternative').fadeOut(0);
  $(".dropdown-button").dropdown({
      inDuration: 100,
      outDuration: 200,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
  var tall = $('.navbar').offset().top;
  $(window).on('scroll',function(){
    if ($(window).scrollTop() > tall) {
      $('.navbar').addClass('big-shadow');
      $('.navbar').addClass('nav-fixed');
      $('.main').addClass('nav-correction');
      $('.brand-logo-alternative').fadeIn(800);
      $('.bar').fadeIn(800);
    } else {
      $('.navbar').removeClass('big-shadow');
      $('.navbar').removeClass('nav-fixed');
      $('.main').removeClass('nav-correction');
      $('.brand-logo-alternative').fadeOut(800);
      $('.bar').fadeOut(800);
    }
  });
  $(".button-collapse").sideNav();
  $('.slider').slider();
  $('ul.tabs').tabs();
  $('.materialboxed').materialbox();
  $('.collapsible').collapsible();
  $('.floating-button').click(function(){
    $('body, html').animate({
      scrollTop: '0px'
    }, 1000);
  });
  $('.controller-nivel-two').removeClass('active');
  /*$('.controller-nivel-two').click(function(){
    this.toggleClass('active');
  });*/
  $(window).scroll(function(){
    if( $(this).scrollTop() > 0 ){
      $('.floating-button').removeClass('scale-out');
    } else {
      $('.floating-button').addClass('scale-out');
    }
  });
});
