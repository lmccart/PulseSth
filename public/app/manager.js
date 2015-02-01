define(function (require) {

  var debugMode = require('./modes/debugMode');

  var playlistPosition, triggerTime, playing;
  
  var playlist = [
    {mode:'debug', duration:0, user:'subject'}
  ];

  function Manager(id) {
    this.modes = {
      debug: debugMode,
    };

    this.start = function() {
      this.getCurrentMode().init();
    }

    this.sync = function() {

    };

    this.reset = function() {
      if(playing) {
        this.getCurrentMode().exit();
      }
      playlistPosition = 0;
      triggerTime = 0;
      playing = false;
    }
    

    this.getCurrentScene = function() {
      return playlist[playlistPosition];
    }

    this.getCurrentModeName = function() {
      return this.getCurrentScene().mode;
    }

    this.getCurrentMode = function() {
      return this.modes[this.getCurrentModeName()];
    }

    this.getCurrentDuration = function() {
      return this.getCurrentScene().duration;
    }

    this.reset();

  }
  
  return Manager;

});
