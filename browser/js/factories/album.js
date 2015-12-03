app.factory('AlbumFactory', function ( $http ) {

  var album = {};

  album.fetchAll = function () {
    return $http.get('/api/albums')
    .then(res => res.data)
  }

  album.fetchById = function ( albumId ) {
    return $http.get('/api/albums/' + albumId)
      .then(res => res.data)
  };


  return album;

})