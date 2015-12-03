app.controller('AlbumCtrl', function($scope, $http, $rootScope, StatsFactory, PlayerFactory) {

  // load our initial data
  var loadAlbum = function( albumId ) {
  
    return $http.get('/api/albums/' + albumId)
    .then(res => res.data )
    .then(album => {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.songs.forEach(function(song){
        song.audioUrl = '/api/songs/' + song._id + '.audio';
      });
      $scope.album = album;
    }).then(function() {
      return StatsFactory.totalTime( $scope.album );
    }).then( duration => {
      $scope.duration = Math.round( Number( duration ) ).toString();
    }).catch(console.error.bind(console));
  
  }

  $scope.show = false;

  $rootScope.$on( 'showview', function( event, view, albumId ) {
    if ( view === 'Album' ) {

      loadAlbum( albumId ).then( function() {
        $scope.show = true;
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
    if ($scope.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.start( song, $scope.album );
  }

});
