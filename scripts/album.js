var createSongRow = function(songNumber, songName, songLength){
  var template =
  '<tr class="album-view-song-item">'
+ '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber +  '</td>'
+ '  <td class="song-item-title">' + songName + '</td>'
+ '  <td class="song-item-duration">' + songLength + '</td>'
+ '</tr>'
;
var $row = $(template);

var clickHandler = function(targetElement) {

    var songNumber = $(this).attr('data-song-number');
    //this replaces songItem which was a switch function
     if (currentlyPlayingSongNumber === null){
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSongNumber = songNumber;
      } else if (currentlyPlayingSongNumber === songNumber){
        $(this).html(playButtonTemplate);
        currentlyPlayingSongNumber = null;
      } else if (currentlyPlayingSongNumber !== songNumber){
        var $currentlyPlayingSongElement = $('.song-item-number[data-song-number="'+currentlyPlayingSongNumber+'"]');
        $($currentlyPlayingSongElement).html(currentlyPlayingSongNumber);
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSongNumber = songNumber;
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

var playButtonTemplate =   '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate =  '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

$(document).ready(function(){

  setCurrentAlbum(Album[0]);
});
