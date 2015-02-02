define(function (require) {

  var wormMode = require('./modes/wormMode');
  var arrayMode = require('./modes/arrayMode');
  var flowMode = require('./modes/flowMode');
  var twoMode = require('./modes/twoMode');
  var faderMode = require('./modes/faderMode');
  var pixiMode = require('./modes/pixiMode');
  
  function Manager(id) {
    this.modes = [
      {mode:wormMode, duration:10*1000},
      {mode:arrayMode, duration:5*1000},
      {mode:faderMode, duration:5*1000},
      {mode:flowMode, duration:5*1000},
      {mode:twoMode, duration:0},
      {mode:pixiMode, duration:0}
    ];
    this.curMode = 0;
    this.playing = false;
    this.modeStartTime = 0;


    this.start = function() {
      this.getCurrentMode().init();
      this.modeStartTime = performance.now();
      this.playing = true;
    }

    this.update = function() {
      var now = performance.now();
      if (now - this.modeStartTime >= this.getCurrentDuration()) {
        this.next();
      }
    }

    this.next = function() {
        console.log('next');
      this.modeStartTime = performance.now();
      this.getCurrentMode().exit();
      this.curMode++;
      if (this.curMode >= this.modes.length) {
        this.curMode = 0;
      }
      this.getCurrentMode().init();
    }

    this.reset = function() {
      if(this.playing) {
        this.getCurrentMode().exit();
      }
    }
    

    this.getCurrentMode = function() {
      return this.modes[this.curMode].mode;
    }

    this.getCurrentDuration = function() {
      return this.modes[this.curMode].duration;
    }


    this.reset();

  }
  
  return Manager;

});
