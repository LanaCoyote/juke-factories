app.controller('PlayerCtrl', function($scope, PlayerFactory){

  // state variables
  $scope.currentSong = PlayerFactory.currentSong;
  $scope.playing = false;

  $scope.hasCurrentSong = function() {
    return PlayerFactory.currentSong !== null;
  }

  $scope.isPlaying = function() {
    return PlayerFactory.isPlaying();
  }

  $scope.getProgress = function() {
    return PlayerFactory.getProgress() * 100;
  }

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.resume();
  }

  // next/prev
  $scope.next = function(){ PlayerFactory.next(); };
  $scope.prev = function(){ PlayerFactory.previous(); };

});
