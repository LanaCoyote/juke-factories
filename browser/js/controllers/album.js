app.controller('AlbumCtrl', function($scope, $rootScope, StatsFactory, PlayerFactory, AlbumFactory, SongFactory ) {

  // load our initial data
  var loadAlbum = function( albumId ) {
  
    return AlbumFactory.fetchById(albumId)
    .then(album => {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.songs.map(function(song){
        return SongFactory.fetchAudioUrl(song);
      });
      $scope.album = album;
    }).catch(console.error.bind(console));
  
  }

  $scope.show = false;

  $rootScope.$on( 'showview', function( event, view, albumId ) {
    if ( view === 'Album' ) {

      loadAlbum( albumId ).then( function() {
        $scope.show = true;
      }).then(function() {
        return StatsFactory.totalTime( $scope.album );
      }).then( duration => {
        $scope.duration = Math.round( Number( duration ) ).toString();
      });

    }
    else $scope.show = false;
  });

  $scope.isCurrentSong = function( song ) {
    return PlayerFactory.currentSong === song;
  }

  $scope.isPlaying = function ( song ) {
    return PlayerFactory.isPlaying() && $scope.isCurrentSong( song );
  }

  // main toggle
  $scope.toggle = function (song) {
    // console.log("Pressed play/pause", "song is playing?", $scope.isPlaying())
    if ($scope.isPlaying(song)) PlayerFactory.pause();
    else PlayerFactory.start( song, $scope.album );
  }

  $scope.toggleShuffle = function() {

    PlayerFactory.toggleShuffle();

  }

  $scope.shuffling = function() {

    return PlayerFactory.isShuffling();

  }

});
