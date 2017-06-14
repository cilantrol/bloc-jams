var forEach = function(a, callBack)  {
  for( var i=0; i<a.length; i++) {
    callBack(a[i]);   //this needs to behave like revealPoints(i);
  }
};
