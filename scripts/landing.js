var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points)  {
  var revealPoints  = function(index)  {
      points[index].style.opacity = 1;
      points[index].style.transform = 'scaleX(1) translate(0,0) rotate(-180deg)';
  }

  pointsArray.forEach(forEach);
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
