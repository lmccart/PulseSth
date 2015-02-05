define(function (require) {

  var opMode = require('./modes/opMode');
  var faderMode = require('./modes/faderMode');
  var rippleMode = require('./modes/rippleMode');
  var grassMode = require('./modes/grassMode');
  var smokeMode = require('./modes/smokeMode');
  var separationMode = require('./modes/separationMode');
  var flockingMode = require('./modes/flockingMode');
  var swipeMode = require('./modes/swipeMode');
  var arrayMode = require('./modes/arrayMode');

  function Manager(id) {
    this.modes = [
      {mode:separationMode, duration:10*1000},
      {mode:swipeMode, duration:5*1000},
      {mode:flockingMode, duration:10*1000},
      {mode:arrayMode, duration:5*1000},
      {mode:swipeMode, duration:5*1000},
      {mode:smokeMode, duration:5*1000},
      {mode:grassMode, duration:5*1000},
      {mode:faderMode, duration:5*1000},
      {mode:rippleMode, duration:5*1000},
      {mode:opMode, duration:5*1000},
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
        //this.next();
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
