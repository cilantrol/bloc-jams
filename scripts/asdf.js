/*
  Massive function that creates a table row for each song and adds click
  onhover and offhover event handlers to each row.
 */
var createSongRow = function(songNumber, songName, songLength) {

  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber +  '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
  ;

  // we create a jQuery object by wrapping template with $ and save it to $row
  var $row = $(template);

  // this is our click handler, bound to the first <td> in each row
  // so `this` is that `<td>`
  var clickHandler = function(event) {
    // get the song number of the row that was clicked. for example if this is clicked:
    // <td data-song-number="3">3</td>
    // songNumber will hold the integer 3
    var songNumber = parseInt($(this).attr('data-song-number'));

    // if we have a currentlyPlayingSongNumber (meaning a song is playing)
    // note: currentlyPlayingSongNumber is set in setSong
    if (currentlyPlayingSongNumber !== null) {
      // getSongNumberCell returns the <td> of the currently playing song
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      // and puts the song number into that <td> (which had a play or pause icon)
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
     }

    // if the song clicked (songNumber) is different than the currently playing song (i.e., they clicked a new song to play)
    if (currentlyPlayingSongNumber !== songNumber) {
      // put the pause button into the <td>
      $(this).html(pauseButtonTemplate);
      // call setSong to update currentlyPlayingSongNumber to this song number and update currentSongFromAlbum to this song object
      setSong(songNumber);
      // call updatePlayerBarSong to make the changes to the player bar: song title, artist, play/pause, etc.
      updatePlayerBarSong();

    // otherwise it means they clicked the same song that is currently playing
    } else if (currentlyPlayingSongNumber === songNumber) {
      // put the play button into the <td>
      $(this).html(playButtonTemplate);
      // change the playbar button to the play button
      $('.main-controls .play-pause').html(playerBarPlayButton);
      // call setSong to set currentlyPlayingSongNumber and currentSongFromAlbum to null, because no song is playing
      setSong(null);
     }
  };

  // handles hover (onmouseover) for this <tr>
  var onHover = function(event) {
    // get the first <td> for this row
    var songNumberCell = $(this).find('.song-item-number');
    // get the song number for this row
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    // if the row they are hovering on is NOT playing
    if (songNumber !== currentlyPlayingSongNumber) {
      // show the play button while they hover
      songNumberCell.html(playButtonTemplate);
    }
  };

  // handles off hover (onmouseout) for this <tr>
  var offHover = function(event) {
    // get the first <td> for this row
    var songNumberCell = $(this).find('.song-item-number');
    // get the song number for this row
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    // if the row they are hovering on is NOT playing
    if (songNumber !== currentlyPlayingSongNumber) {
      // put the song number back in the <td> when they mouse out
      songNumberCell.html(songNumber);
    }
  };

  // we bind our click handler only to the first <td> in the row
  $row.find('.song-item-number').click(clickHandler);

  // but we bind the on/off hover to the full row
  $row.hover(onHover, offHover);//mouseleave and mouse enter

  // and then return all the above: the template, the click handler, the on/off hover handlers
  return $row;
};

/*
  Adds the album title, artist, release info, album cover and songs to the page
 */
var setCurrentAlbum = function(album) {
  // sets the currentAlbum (global var) to the album passed as an argument
  currentAlbum = album;
  // stores elements that we want to update
  var $albumTitle = $('.album-view-title'),
      $albumArtist = $('.album-view-artist'),
      $albumReleaseInfo = $('.album-view-release-info'),
      $albumImage = $('.album-cover-art'),
      $albumSongList = $('.album-view-song-list');

  // updates these elements with the correct content
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  // delete all rows from the <table> that holds our songs so we have a fresh start
  $albumSongList.empty();

  // loop over all the songs for this album , create a <tr> for each one and append it to our <table>
  for (var i=0; i<album.songs.length; i++){
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

/*
  Updates player bar with song name, artist name, pause button, etc.
 */
var updatePlayerBarSong = function(songMobile, artistName, songName){
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);
};

/*
  Handler for when user clicks the Next button
 */
var nextSong = function() {
  //gets the index of the current song from the album.songs array
  var currentSong = trackIndex(currentAlbum, currentSongFromAlbum);
  // increments because the songs array is 0-based but we want the 1-based number
  // i.e., if currentSong is album.songs[0], we want the displayed song number, 1
  currentSong++;

  // if they are on the last song there is no "next" song, so we send them back to the first song
  if (currentSong >= currentAlbum.songs.length){
    currentSong = 0;
  }

  // storing the currently playing song number as the "last song" because that's the song that
  // was playing before we change to the "next" song
  var lastSong = currentlyPlayingSongNumber;

  // now we update the currentlyPlayingSongNumber and currentSongFromAlbum.
  // we are adding one because we are still dealing with 1-based, so if they were on 1 we want to set it to 2
  setSong(currentSong + 1);

  // now that we've changed the current song by calling setSong we can update the player bar with that info
  updatePlayerBarSong();

  // now we get references to the "next song" and the "last song" (the song that _was_ playing)
  // "next song" is kind of wrong because it is technically now the "current" song, but....
  var $nextSongData = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongData = getSongNumberCell(lastSong);

  // we add the pause button the the new/next song...
  $nextSongData.html(pauseButtonTemplate);
  //...and restore the song number to the song they were on before clicking Next
  $lastSongData.html(lastSong);
};

/*
  Handler for when user clicks the Next button
 */
var previousSong = function() {
  //gets the index of the current song from the album.songs array
  var currentSong = trackIndex(currentAlbum, currentSongFromAlbum);
  // decrements because the songs array is 0-based but we want the 1-based number...or wait...
  // but did you notice we get tricky here? In nextSong we changed to 1-based but here we are
  // **decrementing the zero-based** number, meaning if they were playing currentAlbumSongs[2] (displayed as song 3)
  // we current song will be 2 (index) before this, and then we decrement to 1, which is the *index* we want to play!
  currentSong--;

  // if they are on the first song there is no "previous" song, so we send them back to the last song
  if (currentSong < 0){
    // so if there are 5 songs, the last index is 4:currentAlbum.songs[4] or currentAlbum.songs(currentAlbum.songs.length - 1)
    currentSong = currentAlbum.songs.length - 1;
  }

  // storing the currently playing song number as the "last song" because that's the song that
  // was playing before we change to the "previous" song
  var lastSong = currentlyPlayingSongNumber;


  // now we update the currentlyPlayingSongNumber and currentSongFromAlbum.
  // again, note: at this point currentSong is still zero-based, but setSong expects 1-based
  setSong(currentSong + 1);

  // now that we've changed the current song by calling setSong we can update the player bar with that info
  updatePlayerBarSong();

   // now we get references to the "next song" and the "last song" (the song that _was_ playing)
  // "next song" is kind of wrong because it is technically now the "current" song, but...
   var $previousSongData = getSongNumberCell(currentlyPlayingSongNumber);
   var $lastSongData = getSongNumberCell(lastSong);

  // we add the pause button the the new/previous song...
  $previousSongData.html(pauseButtonTemplate);
  //...and restore the song number to the song they were on before clicking Next
  $lastSongData.html(lastSong);
};

/*
  updates the currently playing song *number* and song object (so we can get title, etc)
 */
var setSong = function (songNumber){
  currentlyPlayingSongNumber =  songNumber;
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

/*
  returns the <td> for the song number provided. For example, if `number` is 3:
  <td class="song-item-number" data-song-number="3">3</td>
 */
var getSongNumberCell = function(number){
  return $('.song-item-number[data-song-number="'+number+'"]');
}

/*
  Gets the array index of a song from the album.songs array.
  `album` will be the current playing album
  `song` will be a song object (see fixtures).
  We can get the index by something like: album.songs.indexOf({title: 'Blue', duration: '4:26'});
 */
var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};

// global variables accessible to all functions
// the first two are the play and pause icons for the song rows
// the second two are the play and pause icons for the player bar
var playButtonTemplate =   '<a class="album-song-button"><span class="ion-play"></span></a>',
    pauseButtonTemplate =  '<a class="album-song-button"><span class="ion-pause"></span></a>',
    playerBarPlayButton =  '<span class="ion-play"></span>',
    playerBarPauseButton = '<span class="ion-pause"></span>',

    currentAlbum = null,
    currentlyPlayingSongNumber = null,
    currentSongFromAlbum = null,

    $previousButton = $('.main-controls .previous'),
    $nextButton = $('.main-controls .next');

$(document).ready(function(){
  // set the initial album so the title, artist, songs, etc. get populated
  setCurrentAlbum(albumPicasso);
  // bind the player bar next and previous buttons
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
});



var togglePlayFromPlayerBar = function()  {
  let songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);

    if ( currentSoundFile.isPaused()){            //If a song is paused and the play button is clicked in the player bar, it will

     songNumberCell.html(pauseButtonTemplate);    //Change the song number cell from a play button to a pause button
     $playerBarPlayPause.html(playerBarPauseButton);    //Change the HTML of the player bar's play button to a pause button
     currentSoundFile.play();                     //Play the song
   }
    else if (currentSoundFile){                        //If the song is playing (so a current sound file exist), and the pause button is clicked
                                                  //should not need extra conditional because we are dealing with the play-pause button clicker
     songNumberCell.html(playButtonTemplate);     //Change the song number cell from a pause button to a play button
     $playerBarPlayPause.html(playerBarPlayButton);     //Change the HTML of the player bar's pause button to a play button
     currentSoundFile.pause();                    //Pause the song
   }

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
    $playerBarPlayPause = $('.main-controls .play-pause');

$(document).ready(function(){

  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $playerBarPlayPause.click(togglePlayFromPlayerBar);
});
