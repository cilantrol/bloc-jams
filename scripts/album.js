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
    var songNumber = parseInt($('.song-item-number').attr('data-song-number'));


        if (currentlyPlayingSongNumber !== null) {
            setSongNumberCell(currentlyPlayingSongNumber);

         }

        if (currentlyPlayingSongNumber !== songNumber) {
             $(this).html(pauseButtonTemplate);
             setSong();
             updatePlayerBarSong();

        } else if (currentlyPlayingSongNumber === songNumber) {
             // Switch from Pause -> Play button to pause currently playing song.
             $(this).html(playButtonTemplate);
             $('.main-controls .play-pause').html(playerBarPlayButton);
             currentlyPlayingSongNumber = null;
             currentSongFromAlbum = null;
         }
};

var onHover = function(event) {
    var $songItem = $(this).find('.song-item-number');
    var songData = $songItem.attr('data-song-number');

    if (songData !== currentlyPlayingSongNumber){
      $songItem.html(playButtonTemplate);
    }
};
var offHover = function(event) {
    var $songItem = $(this).find('.song-item-number');
    var songData = $songItem.attr('data-song-number');

    if (songData !== currentlyPlayingSongNumber){
      $songItem.html(songNumber);
    }
    console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
};

$row.find('.song-item-number').click(clickHandler);
$row.hover(onHover, offHover);//mouseleave and mouse enter

return $row;
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

    currentlyPlayingSongNumber = currentSong + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSong];

    updatePlayerBarSong();

     var $nextSongData = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
     var $lastSongData = $('.song-item-number[data-song-number="' + lastSong + '"]');

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

    currentlyPlayingSongNumber = currentSong + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSong];

    updatePlayerBarSong();

     var $previousSongData = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
     var $lastSongData = $('.song-item-number[data-song-number="' + lastSong + '"]');

     $previousSongData.html(pauseButtonTemplate);
     $lastSongData.html(lastSong);
};

var setSong = function (songNumber){


  currentlyPlayingSongNumber =  songNumber;
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1]
};

var setSongNumberCell = function(number){

  return $('.song-item-number[data-song-number="'+currentlyPlayingSongNumber+'"]');
}

var setCurrentAlbum = function(album) {
  currentAlbum = album;
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

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

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};


var playButtonTemplate =   '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate =  '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = parseInt(null);
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function(){

  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
});
