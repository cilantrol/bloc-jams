

var points = document.getElementsByClassName('point');
var forEach = function(a, callBack)  {
  for( var i=0; i<points.length; i++) {
    callBack(points[i]);   //this needs to behave like revealPoints(i);
  }
};
