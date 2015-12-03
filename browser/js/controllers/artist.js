app.controller('ArtistCtrl', function( $scope, $rootScope, $http ) {

  var loadArtist = function( artistId ) {

    return {
      then: function( fn ) { fn() },
    };

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

} );