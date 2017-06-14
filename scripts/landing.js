var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points)  {
  var revealPoints  = function(point)  {
      point.style.opacity = 1;
      point.style.transform = 'scaleX(1) translate(0,0) rotate(-180deg)';
      point.style.transform = 'scaleX(1) translate(100px,-100px) rotate(-180deg)';
  }

  forEach(pointsArray, revealPoints);
};


window.onload = function () {
var sellingPoints = document.getElementsByClassName('selling-points')[0];
var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

  if (window.innerHeight > 950) {  //for window height > 950 to ensure animatePoints still procs
    animatePoints(pointsArray);
  }

  window.addEventListener('scroll', function(event) {
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance)  {
      animatePoints(pointsArray);
    }
  });
};
