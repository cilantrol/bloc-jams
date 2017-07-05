var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points)  {
  var revealPoints  = function(point)  {
      point.style.opacity = 1;
      point.style.transform = 'scaleX(1) translate(0,100px) rotate(0deg)';

  }

  forEach(pointsArray, revealPoints);
};


$(window).load(function)  {

var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

  if ($(window).height() > 950) {  //for window height > 950 to ensure animatePoints still procs
    animatePoints();
  }

  $(window).scroll(function(event) {
    if ($(window).scrollTop() >= scrollDistance)  {
      animatePoints();
    }
  });
};
