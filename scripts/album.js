var createSongRow = function(songNumber, songName, songLength){
  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber +  '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
;
var $row = $(template);

var clickHandler = function(event) {
    var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
          var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
          currentlyPlayingCell.html(currentlyPlayingSongNumber);
         }

        if (currentlyPlayingSongNumber !== songNumber) {
             setSong(songNumber);
             currentSoundFile.play();
             $(this).html(pauseButtonTemplate);
             updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
             // Switch from Pause -> Play button to pause currently playing song.
             if ( currentSoundFile.isPaused()){
              $(this).html(pauseButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPlayButton);
              currentSoundFile.play();
            } else {
              $(this).html(playButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPlayButton);
              currentSoundFile.pause();
            }
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
  $('.main-controls .play-pause').html(playerBarPauseButton);
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
  var $toggleButton = $('.main-controls .play-pause');
  let songNumberCell = $(this).find('.song-item-number');

  $toggleButton.click(function(){
    /*I have tried switching playerBarPlay/PauseButton between the blocks and it did make me able to toggle the playerBarPauseButton
    but then the songNumberCell Template wouldnt always sync up with the playerBar Template

    by removing the if (currentSoundFile exists) conditional I have come to the conclusion that the .isPaused() conditional is working as intended
    whatever songNumberCell is clicked it would play and pause without problem for THOSE "2" clicks.
    The 3rd click which is supposed to resume PLAY from PAUSED 'saved' state isnt not working.

    This also leads me to believe my conditional statements do not need extra && or ||
    because .isPaused() is working as intended and the buttons toggle to reflect that only for the first 2 clicks

    My next assumption is to switch the conditional blocks to see if it was a matter of order.
    1. ran if(currentSoundFile) as 1st conditional => did not change outcome
    2. nested .isPaused() inside conditional if(currentSoundFile) => did not change outcome

    At this point I know the if(currentSoundFile) conditional is the problem
    but i have followed the instructions clearly so i dont know what's wrong.
    I have also tried incorporating elements from the clickHandler function but i know that also is incorrect
    This has nothing to do with currentlyPlayingSongNumber*/


    if ( currentSoundFile.isPaused()){            //If a song is paused and the play button is clicked in the player bar, it will

     songNumberCell.html(pauseButtonTemplate);    //Change the song number cell from a play button to a pause button
     $toggleButton.html(playerBarPauseButton);    //Change the HTML of the player bar's play button to a pause button
     currentSoundFile.play();                     //Play the song
   }
    if (currentSoundFile){                        //If the song is playing (so a current sound file exist), and the pause button is clicked
                                                  //should not need extra conditional because we are dealing with the play-pause button clicker
     songNumberCell.html(playButtonTemplate);     //Change the song number cell from a pause button to a play button
     $toggleButton.html(playerBarPlayButton);     //Change the HTML of the player bar's pause button to a play button
     currentSoundFile.pause();                    //Pause the song
   }
  });
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
    $nextButton = $('.main-controls .next');

$(document).ready(function(){

  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  togglePlayFromPlayerBar();                    //load togglePlayFromPlayerBar
});
