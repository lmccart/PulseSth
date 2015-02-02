define(function (require) {

  var debugMode = require('./modes/debugMode');
  var twoMode = require('./modes/twoMode');
  var pixiMode = require('./modes/pixiMode');
  
  function Manager(id) {
    this.modes = [
      {mode:debugMode, duration:0},
      {mode:twoMode, duration:0},
      {mode:pixiMode, duration:0}
    ];
    this.curMode = 0;
    this.playing = false;


    this.start = function() {
      console.log(this.getCurrentMode())
      this.getCurrentMode().init();
    }

    this.sync = function() {
    };

    this.reset = function() {
      if(this.playing) {
        this.getCurrentMode().exit();
      }
    }
    

    this.getCurrentMode = function() {
      return this.modes[this.curMode].mode;
    }


    this.reset();

  }
  
  return Manager;

});
