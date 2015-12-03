app.factory('SongFactory', function () {

  var song = {};

  song.fetchAudioUrl = function (song) {
    song.audioUrl = '/api/songs/' + song._id + '.audio';
    return song;
  };

  return song;

});