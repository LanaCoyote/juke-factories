app.factory('ArtistFactory', function ($http, $q) {

  var artist = {};

  artist.fetchAll = function () {
    return $http.get('/api/artists/')
    .then(res => res.data);
  }

  artist.fetchOne = function (artistID) {
    return $q.all([$http.get('/api/artists/' + artistID), 
      $http.get('/api/artists/' + artistID + '/albums'),
      $http.get('/api/artists/' + artistID + '/songs')])
        .then(function (responses) {
          var artist = responses[0].data;
          artist.albums = responses[1].data;
          artist.songs = responses[2].data;
          return artist;
        });
  };

  return artist;
})