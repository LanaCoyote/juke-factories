app.controller('SidebarCtrl', function( $scope, $rootScope ) {

  $scope.curView = null;

  $scope.viewAlbums = function() {

    $scope.curView = 'albums';
    $rootScope.$broadcast( 'showview', 'AlbumList' );

  }

  $scope.viewAllArtists = function() {

    $scope.curView = 'artists';
    $rootScope.$broadcast( 'showview', 'ArtistList' );

  }

});