var animatePoints= function() {
  var revealPoint = function() {
    $(this).css({
      opacity: 1,
      transform: 'scaleX(1) translateY(0)'
    });
  };
  $.each($('.point'), revealPoint);
};


$(window).load(function()  {

var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

  if ($(window).height() > 950) {  //for window height > 950 to ensure animatePoints still procs
    animatePoints();
  }

  $(window).scroll(function(event) {
    if ($(window).scrollTop() >= scrollDistance)  {
      animatePoints();
    }
  });
});
