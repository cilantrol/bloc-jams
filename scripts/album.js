var createSongRow = function(songNumber, songName, songLength){
  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber +  '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
    + '</tr>'
;
var $row = $(template);

var clickHandler = function(event) {
    var songNumber = parseInt($(this).attr('data-song-number'));

      //Update clickHandler() to set the CSS of the volume seek bar to equal the currentVolume.
        if (currentlyPlayingSongNumber !== null) {
          var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
          currentlyPlayingCell.html(currentlyPlayingSongNumber);
         }

        if (currentlyPlayingSongNumber !== songNumber) {
             setSong(songNumber);
             currentSoundFile.play();
             updateSeekBarWhileSongPlays();
             $(this).html(pauseButtonTemplate);
             updatePlayerBarSong();
             //setVolume(currentVolume) defaults by using css properties @ 80%
             var $volumeFill = $('.volume .fill');
             var $volumeThumb = $('.control-group .thumb');
             //thumb is bar length
             //fill is how much volume %
             $volumeFill.width(currentVolume + '%');
             $volumeThumb.css({
               left: currentVolume + '%'
             });
        } else if (currentlyPlayingSongNumber === songNumber) {
          // this conditional makes the check  if currentSong matches the correct songNumber
          // then run logic  of pause/play templates with sound included
          // togglePlayFromPlayerBar will match clickHandler when placed here
          // Switch from Pause -> Play button to pause currently playing song.
             togglePlayFromPlayerBar();// this replaces all the code below
  /*           if ( currentSoundFile.isPaused()){
              $(this).html(pauseButtonTemplate);
              $playerBarToggleButton.html(playerBarPlayButton);
              currentSoundFile.play();
            } else {
              $(this).html(playButtonTemplate);
              $playerBarToggleButton.html(playerBarPlayButton);
              currentSoundFile.pause();
            }*/
         }
};

var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(playButtonTemplate);
    }
};

var offHover = function(event) {
  var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
       songNumberCell.html(songNumber);
    }
    //console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
};

$row.find('.song-item-number').click(clickHandler);
$row.hover(onHover, offHover);//mouseleave and mouse enter

return $row;
};

var setCurrentAlbum = function(album) {
  currentAlbum = album;
  var $albumTitle = $('.album-view-title'),
      $albumArtist = $('.album-view-artist'),
      $albumReleaseInfo = $('.album-view-release-info'),
      $albumImage = $('.album-cover-art'),
      $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  //  albumSongList.innerHTML = '';
  $albumSongList.empty();

  //4
  for (var i=0; i<album.songs.length; i++){
//    albumSongList.innerHTML += createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

var updatePlayerBarSong = function(songMobile, artistName, songName){
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $playerBarToggleButton.html(playerBarPauseButton);
};

var nextSong = function() {
    var currentSong = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSong++;

      if (currentSong >= currentAlbum.songs.length){
        currentSong = 0;
      }
    var lastSong = currentlyPlayingSongNumber;

    //currentlyPlayingSongNumber = currentSong + 1;
    //currentSongFromAlbum = currentAlbum.songs[currentSong];
    setSong(currentSong + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    updateSeekBarWhileSongPlays();

     //var $nextSongData = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
     //var $lastSongData = $('.song-item-number[data-song-number="' + lastSong + '"]');
     var $nextSongData = getSongNumberCell(currentlyPlayingSongNumber);
     var $lastSongData = getSongNumberCell(lastSong);

     $nextSongData.html(pauseButtonTemplate);
     $lastSongData.html(lastSong);
};

var previousSong = function() {

    var currentSong = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSong--;

      if (currentSong < 0){
        currentSong = currentAlbum.songs.length - 1;
      }

    var lastSong = currentlyPlayingSongNumber;

    //currentlyPlayingSongNumber = currentSong + 1;
    //currentSongFromAlbum = currentAlbum.songs[currentSong];
    setSong(currentSong + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    updateSeekBarWhileSongPlays();

     //var $previousSongData = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
     //var $lastSongData = $('.song-item-number[data-song-number="' + lastSong + '"]');
     var $previousSongData = getSongNumberCell(currentlyPlayingSongNumber);
     var $lastSongData = getSongNumberCell(lastSong);

     $previousSongData.html(pauseButtonTemplate);
     $lastSongData.html(lastSong);
};


var setSong = function (songNumber){
  if (currentSoundFile){
    currentSoundFile.stop();
  }
  currentlyPlayingSongNumber =  parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
// new buzz sound Object => pass in audioUrl,
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: ['mp3'],//modify audioUrl property with
    preload: true//load as soon as page loads
  });
  setVolume(currentVolume);
};

var setVolume = function(volume)  {
  if(currentSoundFile){
    currentSoundFile.setVolume(volume);
  }
};

var getSongNumberCell = function(number){
  return $('.song-item-number[data-song-number="'+number+'"]');
}

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var togglePlayFromPlayerBar = function()  {
  let songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    if ( currentSoundFile.isPaused()){            //If a song is paused and the play button is clicked in the player bar, it will
      //console.log(this);
     songNumberCell.html(pauseButtonTemplate);    //Change the song number cell from a play button to a pause button
     $playerBarToggleButton.html(playerBarPauseButton);    //Change the HTML of the player bar's play button to a pause button
     currentSoundFile.play();                     //Play the song
   }else    if (currentSoundFile){                        //If the song is playing (so a current sound file exist), and the pause button is clicked
                                                  //should not need extra conditional because we are dealing with the play-pause button clicker
     songNumberCell.html(playButtonTemplate);     //Change the song number cell from a pause button to a play button
     $playerBarToggleButton.html(playerBarPlayButton);     //Change the HTML of the player bar's pause button to a play button
     currentSoundFile.pause();                    //Pause the song
   }
};

var updateSeekPercentage= function($seekBar, seekBarFillRatio)  {
  //#1
  var offsetXPercent = seekBarFillRatio * 100;
  //We start by multiplying the ratio by 100 to determine a percentage. At #1, we use the built-in JavaScript Math.max() function
  // to make sure our percentage isn't less than zero and the Math.min() function to make sure it doesn't exceed 100
  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);

  //#2
  //we convert our percentage to a string and add the % character. When we set the width of the .fill class and the left value of the .thumb class,
  //the CSS interprets the value as a percent instead of a unit-less number between 0 and 100.
  var percentageString = offsetXPercent + '%';
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({left: percentageString});

};

var setupSeekBars = function () {
  var $seekBars = $('.player-bar .seek-bar');
  //console.log(this);
  /*we see a new property on the event object called pageX. This is a jQuery-specific event value,
  which holds the X (or horizontal) coordinate at which the event occurred */
  $seekBars.click(function(event){
    var offsetX = event.pageX - $(this).offset().left; //this offset refers to how much space ('.player-bar .seek-bar') div container takes up from the left in X coordinates
    //event.pageX is the entire width of document up to where our event occured in this case where we click.
    var barWidth = $(this).width();
    var seekBarFillRatio = offsetX / barWidth;
    //we divide offsetX by the width of the entire bar to calculate seekBarFillRatio.

    //Checks the class of the seek bar's parent to determine whether the current seek bar is changing the volume or seeking to a song position
    if ( $(this).parent().prop('className') == 'seek-control' ){
      //If it's the playback seek bar, seek to the position of the song determined by the seekBarFillRatio
      seek( seekBarFillRatio * currentSoundFile.getDuration() );
    }else {
      //Otherwise, set the volume based on the seekBarFillRatio
      setVolume(seekBarFillRatio*100);
    }

    updateSeekPercentage($(this), seekBarFillRatio);
    //we pass $(this) as the $seekBar argument and seekBarFillRatio for its eponymous argument to updateSeekBarPercentage().
  });
  $seekBars.find('.thumb').mousedown(function(event){
    // the mousedown event will fire as soon as the mouse button is pressed down. In contrast to this, the mouseup event is the opposite:
    // it fires when the mouse button is released. jQuery allows us access to a shorthand method of attaching
    // the mousedown event by calling mousedown on a jQuery collection.
    var $seekBar = $(this).parent();
    /*this will be equal to the .thumb node that was clicked. Because we are attaching an event to both the song seek and volume control,
     this is an important way for us to determine which of these nodes dispatched the event. We can then use the  parent method,
      which will select the immediate parent of the node. This will be whichever seek bar this .thumb belongs to.*/
    console.log('this:' + this + $seekBar);//parent should be 1 up the dom from this
    $(document).bind('mousemove.thumb', function(event){
      var offsetX = event.pageX - $seekBar.offset().left;
      var barWidth = $seekBar.width();
      var seekBarFillRatio = offsetX / barWidth;

      updateSeekPercentage($seekBar, seekBarFillRatio);
    });

    $(document).bind('mouseup.thumb', function(){
      //We've attached the mousemove event to $(document) to make sure that we can drag the thumb after mousing down, even when the mouse leaves the seek bar.
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });
  });
};

var updateSeekBarWhileSongPlays = function () {
  if (currentSoundFile){
    //bind() the timeupdate event to currentSoundFile. timeupdate is a custom Buzz event that fires repeatedly while time elapses during song playback.
    currentSoundFile.bind('timeupdate', function(event){
      // new method for calculating the seekBarFillRatio. We use Buzz's  getTime() method to get the current time of the song and the
      //getDuration() method for getting the total length of the song. Both values return time in seconds.
      var seekBarFillRatio = this.getTime() / this.getDuration();
      var $seekBar = $('.seek-control .seek-bar');

      updateSeekPercentage($seekBar, seekBarFillRatio);
      //Wrap the arguments passed to setCurrentTimeInPlayerBar() and setTotalTimeInPlayerBar() in a filterTimeCode() call so the time output below the seek bar is formatted.
      filterTimeCode(setCurrentTimeInPlayerBar(this.getTime()));
      filterTimeCode(setTotalTimeInPlayerBar(this.getDuration()));
    })
  }
};

var seek = function(time){
  if (currentSoundFile){
    currentSoundFile.setTime(time);
  }
};

//Write a function called setCurrentTimeInPlayerBar() that takes one argument, currentTime, that sets the text of the element with the .current-time class to the current time in the song.
var setCurrentTimeInPlayerBar = function(currentTime){
  $('.current-time').text(currentTime);
};
//Write a function called setTotalTimeInPlayerBar() that takes one argument, totalTime, that sets the text of the element with the .total-time class to the length of the song.
var setTotalTimeInPlayerBar = function(totalTime){
  $('.total-time').text(totalTime);
};
//Write a function called filterTimeCode that takes one argument, timeInSeconds. It should:
var filterTimeCode = function(timeInSeconds){
  //Use the parseFloat() method to get the seconds in number form.
  var realTime = parseFloat(timeInSeconds);
  //console.log(realTime);
  //Store variables for whole seconds and whole minutes (hint: use Math.floor() to round numbers down).
  var wholeSeconds = Math.floor(realTime  % 60);
  var wholeMinutes = Math.floor(realTime  / 60);
  if (wholeSeconds > 60){
    wholeMinutes+=1;
  }
  //Return the time in the format X:XX
  var MMSS = wholeMinutes+':'+wholeSeconds;
  return MMSS;
};

var playButtonTemplate =   '<a class="album-song-button"><span class="ion-play"></span></a>',
    pauseButtonTemplate =  '<a class="album-song-button"><span class="ion-pause"></span></a>',
    playerBarPlayButton =  '<span class="ion-play"></span>',
    playerBarPauseButton = '<span class="ion-pause"></span>',

    currentAlbum = null,
    currentlyPlayingSongNumber = null,
    currentSongFromAlbum = null,
    currentSoundFile = null,
    currentVolume = 80,

    $previousButton = $('.main-controls .previous'),
    $nextButton = $('.main-controls .next'),
    $playerBarToggleButton = $('.main-controls .play-pause');
    $seekBars = $('.player-bar .seek-bar');

$(document).ready(function(){

  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $playerBarToggleButton.click(togglePlayFromPlayerBar);
  setupSeekBars();
});
