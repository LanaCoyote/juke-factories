app.controller('AlbumListCtrl', function( $scope, $rootScope, $http ) {

  $scope.show = false;

  $rootScope.$on( 'showview', function( event, view ) { 
    if ( view === 'AlbumList' ) $scope.show = true; 
    else $scope.show = false;
  });

  $http.get('/api/albums/')
  .then(res => res.data)
  .then(albums => {

    albums.map( function( album ) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      return album;
    });
    $scope.albums = albums;

  });

  $scope.viewAlbum = function( albumId ) {

    $rootScope.$broadcast( 'showview', 'Album', albumId )

  }

});