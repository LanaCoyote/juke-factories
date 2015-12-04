app.controller('ArtistCtrl', function( $scope, $rootScope, PlayerFactory, ArtistFactory, SongFactory ) {

  var loadArtist = function( artistId ) {

    return ArtistFactory.fetchOne(artistId)
    // .then(res => res.data)
    .then(function (artist) {
      $scope.artist = artist;
      $scope.artist.albums.map(function (album) {
        album.imageUrl = '/api/albums/' + album._id + '.image';
        return album;
      })
      $scope.artist.songs.map(function (song) {
        return SongFactory.fetchAudioUrl(song);
      })
    });

  }

  $scope.show = false;

  $rootScope.$on( 'showview', function( event, view, artistId ) { 
    if ( view === 'Artist' ) {
      loadArtist( artistId ) .then( function() {
        $scope.show = true;
      });

    }
    else $scope.show = false;
  });

  $scope.isCurrentSong = function( song ) {
    return PlayerFactory.currentSong === song;
  };

  $scope.isPlaying = function ( song ) {
    return PlayerFactory.isPlaying() && $scope.isCurrentSong( song );
  };

  // main toggle
  $scope.toggle = function (song) {
    if ($scope.isPlaying(song)) PlayerFactory.pause();
    else PlayerFactory.start( song, {songs:$scope.artist.songs} );
  };

  $scope.toggleShuffle = function() {

    PlayerFactory.toggleShuffle();

  }

  $scope.shuffling = function() {

    return PlayerFactory.isShuffling();

  }
  
  $scope.viewAlbum = function( albumId ) {

    $rootScope.$broadcast( 'showview', 'Album', albumId )

  };

} );