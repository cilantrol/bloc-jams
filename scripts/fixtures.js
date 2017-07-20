var albumPicasso =  {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs:   [
        { title: 'Blue', duration: '4:26', audioUrl: 'assets/music/blue' },
        { title: 'Green', duration: '3:14', audioUrl: 'assets/music/green' },
        { title: 'Red', duration: '5:01', audioUrl: 'assets/music/red' },
        { title: 'Pink', duration: '3:21', audioUrl: 'assets/music/pink' },
        { title: 'Magenta', duration: '2:15', audioUrl: 'assets/music/magenta' }
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




var nextSong = function() {

    var currentSong = function(currentAlbum, currentSongFromAlbum){
    currentSong++;


    return trackIndex(album, song);
    };
};
