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
    var songNumber = $(this).attr('data-song-number');
    //this replaces songItem which was a switch function
     if (currentlyPlayingSongNumber === null){
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSongNumber = songNumber;
        updatePlayerBarSong();
         $('.main-controls .play-pause').html(playerBarPlayButton);
      } else if (currentlyPlayingSongNumber === songNumber){
        $(this).html(playButtonTemplate);
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
         $('.main-controls .play-pause').html(playerBarPlayButton);
      } else if (currentlyPlayingSongNumber !== songNumber){
        var $currentlyPlayingSongElement = $('.song-item-number[data-song-number="'+currentlyPlayingSongNumber+'"]');
        $($currentlyPlayingSongElement).html(currentlyPlayingSongNumber);
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSongNumber = songNumber;
        currentSongFromAlbum = currentAlbum.songs[songNumber-1];
        updatePlayerBarSong();
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
};

$row.find('.song-item-number').click(clickHandler);
$row.hover(onHover, offHover);//mouseleave and mouse enter

return $row;
};

var updatePlayerBarSong = function(songMobile, artistName, songName){
  let template =  '<div class="control-group currently-playing">'+
                  ' <h2 class="song-name">'+songName+'</h2>'+
                  ' <h2 class="artist-song-mobile">'+songMobile+'</h2>'+
                  ' <h3 class="artist-name">'+artistName+'</h3>'+
                  '</div>';
  $('.main-controls .play-pause').html(playerBarPauseButton);
  var $playerBar = $(template);
return $playerBar;
};

var setCurrentAlbum = function(album) {
  currentAlbum = album;
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  var $songName = $('.song-name');
  var $artistSongMobile = $('.artist-song-mobile');
  var $artistName = $('.artist-name');
  var $controlGroupCurrentlyPlaying = $('.control-group currently-playing');

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);


for (let i = 0; i < album.songs.length; i++){
  $songName.text(album.songs[i].title);
  $artistSongMobile.text(album.songs[i].title);
  $artistName.text(album.artist);
}

  //  albumSongList.innerHTML = '';
  $albumSongList.empty();
  $controlGroupCurrentlyPlaying.empty();

  //4
  for (var i=0; i<album.songs.length; i++){
//    albumSongList.innerHTML += createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    var $newPlayerBar = updatePlayerBarSong(album.songs[i].title, album.artist[i], album.songs[i].title)
    $albumSongList.append($newRow);
    $controlGroupCurrentlyPlaying.append($newPlayerBar);
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
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

$(document).ready(function(){

  setCurrentAlbum(albumPicasso);
});
