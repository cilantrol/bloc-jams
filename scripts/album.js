var albumPicasso =  {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs:   [
        {title: 'Blue', duration: '4:26'},
        {title: 'Green' , duration: '3:14'},
        {title: 'Red' , duration: '5:01'},
        {title: 'Pink' , duration: '3:21'},
        {title: 'Magenta' , duration: '2:15'}
  ]
};
var albumMarconi =  {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs:   [
        {title: 'Hello, Operator', duration: '1:01'},
        {title: 'Ring, ring, ring' , duration: '5:01'},
        {title: 'Fits in your pocket' , duration: '3:21'},
        {title: 'Can you hear me now?' , duration: '3:14'},
        {title: 'Wrong phone number' , duration: '2:15'}
  ]
};
var albumTesting =  {
  title: 'The Test',
  artist: 'MC Test',
  label: 'Beat the Curve Records',
  year: '2010',
  albumArtUrl: 'assets/images/album_covers/04.png',
  songs:   [
        {title: 'how to get F', duration: '4:26'},
        {title: 'how to get D' , duration: '3:14'},
        {title: 'how to get C' , duration: '5:01'},
        {title: 'how to get B' , duration: '3:21'},
        {title: 'how to get A' , duration: '2:15'}
  ]
};

var Album = [albumPicasso, albumMarconi, albumTesting];

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
     if (currentlyPlayingSong === null){
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSong = songNumber;
      } else if (currentlyPlayingSong === songNumber){
        $(this).html(playButtonTemplate);
        currentlyPlayingSong = null;
      } else if (currentlyPlayingSong !== songNumber){
        var $currentlyPlayingSongElement = $('.song-item-number[data-song-number="'+currentlyPlayingSong+'"]');
        $($currentlyPlayingSongElement).html(currentlyPlayingSong);
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSong = songNumber;
      }

/*if (!currentlyPlayingSong){
  $(this).html(pauseButtonTemplate);
  currentlyPlayingSong = songNumber;
}else if (currentlyPlayingSong !== songNumber){
  var $currentlyPlayingSong = $('.song-item-number[data-song-number="'+currentlyPlayingSong+ '"]');
  $($currentlyPlayingSong).html(songNumber);
}else if (currentlyPlayingSong == songNumber){
  $(this).html(playButtonTemplate);
  currentlyPlayingSong = null;
}*/

};

var onHover = function(event) {
    var $songItem = $(this).find('.song-item-number');
    var songData = $songItem.attr('data-song-number');

    if (songData !== currentlyPlayingSong){
      $songItem.html(playButtonTemplate);
    }
};
var offHover = function(event) {
    var $songItem = $(this).find('.song-item-number');
    var songData = $songItem.attr('data-song-number');

    if (songData !== currentlyPlayingSong){
      $songItem.html(songNumber);
    }
};

$row.find('.song-item-number').click(clickHandler);
$row.hover(onHover, offHover);//mouseleave and mouse enter

return $row;
};

var setCurrentAlbum = function(album) {

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

/*var getSongItem = function(element) {
    switch (element.className) {
      case 'album-song-button':
      case 'ion-play':
      case 'ion-pause':
          return findParentByClassName(element, 'song-item-number');
      case 'album-view-song-item':
          return element.querySelector('.song-item-number');
      case 'song-item-title':
      case 'song-item-duration':
          return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
      case 'song-item-number':
          return element;
      default:
          return;
    }
};
var clickHandler = function(targetElement){

  var songItem = getSongItem(targetElement);

       if (currentlyPlayingSong === null) {
           songItem.innerHTML = pauseButtonTemplate;
           currentlyPlayingSong = songItem.getAttribute('data-song-number');
       } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
           songItem.innerHTML = playButtonTemplate;
           currentlyPlayingSong = null;
       } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
           var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
           currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
           songItem.innerHTML = pauseButtonTemplate;
           currentlyPlayingSong = songItem.getAttribute('data-song-number');
       }
};*/

var playButtonTemplate =   '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate =  '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

$(document).ready(function(){
  var index = 0;
  setCurrentAlbum(Album[index]);
});
