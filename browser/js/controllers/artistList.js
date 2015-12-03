app.controller('ArtistListCtrl', function( $scope, $rootScope, $http ) {

  $scope.show = false;

  $rootScope.$on( 'showview', function( event, view ) { 
    if ( view === 'ArtistList' ) $scope.show = true; 
    else $scope.show = false;
  });

  $http.get('/api/artists/')
  .then(res => res.data)
  .then(artists => {

    $scope.artists = artists;

  });

  $scope.viewArtist = function( artistId ) {

    $rootScope.$broadcast( 'showview', 'Artist', artistId );

  }

})