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
             $(this).html(pauseButtonTemplate);
             setSong(songNumber);
             currentSoundFile.play();
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
    console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
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
});
