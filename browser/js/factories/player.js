app.factory('PlayerFactory', function( $rootScope ) {

  var player = {

    audio: document.createElement('audio'),
    currentSong: null,
    album: [],

  };

  player.audio.addEventListener( 'ended', function() {

    player.next();

  } );

  player.audio.addEventListener( 'timeupdate', function() {

    $rootScope.$digest();

  });

  player.start = function( song, album ) {

    if ( album ) player.album = album;

    if ( player.currentSong !== song ) {

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

  player.isPlaying = function() {

    return !player.audio.paused;

  }

  player.getCurrentSong = function() {

    return player.currentSong;

  }

  player.next = function() {

    var songIdx = player.album.songs.indexOf( player.currentSong );
    player.start( player.album.songs[(songIdx + 1) % player.album.songs.length] );

  }

  player.previous = function() {

    var songIdx = player.album.songs.indexOf( player.currentSong ) - 1;
    if ( songIdx < 0 ) songIdx = player.album.songs.length + (songIdx);
    player.start( player.album.songs[(songIdx) % player.album.songs.length] );

  }

  player.getProgress = function() {

    if ( player.currentSong === null ) return 0;
    return player.audio.currentTime / player.audio.duration;

  }

  return player;

});