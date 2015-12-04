app.factory('PlayerFactory', function( $rootScope ) {

  var player = {

    audio: document.createElement('audio'),
    currentSong: null,
    album: null,

  };

  var shuffle = false;
  var shuffleList;

  player.audio.addEventListener( 'ended', function() {

    player.next();

  } );

  player.audio.addEventListener( 'timeupdate', function() {

    $rootScope.$digest();

  });

  player.start = function( song, album, restart ) {

    if ( album ) player.album = album;

    if ( player.currentSong !== song || restart ) {

      player.pause();

      player.currentSong = song;

      player.audio.src = song.audioUrl;
      player.audio.load();
      player.audio.play();

    } else {

      player.resume();

    }

  }

  player.pause = function() {

    player.audio.pause();

  }

  player.resume = function() {

    player.audio.play();

  }

  var getShuffleList = function() {

    shuffleList = player.album.songs.slice();
    shuffleList = shuffleList
      .sort( function() {
        return Math.random()-0.5;
      })
      .filter( function( song ) {
        return song !== player.currentSong;
      });

  }

  player.isShuffling = function() {

    return shuffle;

  }

  player.toggleShuffle = function() {

    if ( shuffle ) {
      shuffle = false;
    } else if ( player.album ) {

      shuffle = true;
      getShuffleList();

    }

  }

  player.isPlaying = function() {

    return !player.audio.paused;

  }

  player.getCurrentSong = function() {

    return player.currentSong;

  }

  player.next = function() {

    if ( shuffle ) {

      var nextsong = shuffleList.pop();
      player.start( nextsong );

      if ( shuffleList.length === 0 ) {
        getShuffleList();
      }

    } else {
    
      var songIdx = player.album.songs.indexOf( player.currentSong );
      player.start( player.album.songs[(songIdx + 1) % player.album.songs.length], null, true );

    }
  }

  player.previous = function() {

    if ( shuffle ) {

      var nextsong = shuffleList.shift();
      player.start( nextsong );

      if ( shuffleList.length === 0 ) {
        getShuffleList();
      }

    } else {

      var songIdx = player.album.songs.indexOf( player.currentSong ) - 1;
      if ( songIdx < 0 ) songIdx = player.album.songs.length + (songIdx);
      player.start( player.album.songs[(songIdx) % player.album.songs.length], null, true );

    }

  }

  player.getProgress = function() {

    if ( player.currentSong === null ) return 0;
    return player.audio.currentTime / player.audio.duration;

  }

  return player;

});