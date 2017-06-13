/*var animatePoints = function()  {
  var points = document.getElementsByClassName('point');

  var revealFirstPoint  = function()  {
    points[0].style.opacity = 1;
    points[0].style.transform = 'scaleX(1) translateY(0)';
    points[0].style.msTransform = 'scaleX(1) translateY(0)';
    points[0].style.WebkiTransform = 'scaleX(1) translateY(0)';
  };
  var revealSecondPoint  = function()  {
    points[1].style.opacity = 1;
    points[1].style.transform = 'scaleX(1) translateY(0)';
    points[1].style.msTransform = 'scaleX(1) translateY(0)';
    points[1].style.WebkiTransform = 'scaleX(1) translateY(0)';
  };
  var revealThirdPoint  = function()  {
    points[2].style.opacity = 1;
    points[2].style.transform = 'scaleX(1) translateY(0)';
    points[2].style.msTransform = 'scaleX(1) translateY(0)';
    points[2].style.WebkiTransform = 'scaleX(1) translateY(0)';
  };
  revealFirstPoint();
  revealSecondPoint();
  revealThirdPoint();
};*/
//animatePoints();
var animatePoints = function()  {
  var points = document.getElementsByClassName('point');
  var revealPoints  = function(index)  {
      points[index].style.opacity = 1;
      points[index].style.transform = 'scaleX(1) translate(0,0) rotate(-180deg)';
  }
  for(var i=0; i<points.length; i++)  {
    revealPoints(i);
  }
};


window.onload = function () {
//  alert('The window has been loaded');
animatePoints();
};
