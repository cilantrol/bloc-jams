var animatePoints = function()  {
  var points = document.getElementsByClassName('point');

  var revealFirstPoint  = function()  {
    points[0].style.opacity = 1;
    points[0].style.transform = 'scale(1) translate(0)';
    points[0].style.msTransform = 'scale(1) translate(0)';
    points[0].style.WebkiTransform = 'scale(1) translate(0)';
  };
  var revealSecondPoint  = function()  {
    points[1].style.opacity = 1;
    points[1].style.transform = 'scale(1) translate(0)';
    points[1].style.msTransform = 'scale(1) translate(0)';
    points[1].style.WebkiTransform = 'scale(1) translate(0)';
  };
  var revealThirdPoint  = function()  {
    points[2].style.opacity = 1;
    points[2].style.transform = 'scale(1) translate(0)';
    points[2].style.msTransform = 'scale(1) translate(0)';
    points[2].style.WebkiTransform = 'scale(1) translate(0)';
  };
  revealFirstPoint();
  revealSecondPoint();
  revealThirdPoint();
};
animatePoints();


window.onload = function () {
//  alert('The window has been loaded');
};
