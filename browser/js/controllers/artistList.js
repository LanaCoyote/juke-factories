app.controller('ArtistListCtrl', function( $scope, $rootScope, ArtistFactory ) {

  $scope.show = false;

  $rootScope.$on( 'showview', function( event, view ) { 
    if ( view === 'ArtistList' ) $scope.show = true; 
    else $scope.show = false;
  });

  ArtistFactory.fetchAll()
  .then(artists => {

    $scope.artists = artists;

  });

  $scope.viewArtist = function( artistId ) {

    $rootScope.$broadcast( 'showview', 'Artist', artistId );

  }

})