/*Using click(), sets the text of the element with the event-element class to "Clicked!"
Using hover(), sets the text of the element with the event-element class to "Moused over!" with the first callback and "Moused left!" with the second.
The end behavior should match the video below:*/


$(document).ready(function(){
  $('.event-element').click(function(){
      $('.event-element').text('clicked!');
  });



  var on = function(event){
    $('.event-element').text('Moused over!');
  };

  var off = function(event){
    $('.event-element').text('Mouse left!');
  };

  var swiatch = '<div class="event-element">'+
                '</div>';
  var $switch = $(swiatch);
  $switch.hover(on, off);

  return $switch;

});
