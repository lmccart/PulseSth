define(['jquery'], function ($) {
  function Mode(title) {
    this.init = function() {};
    this.next = function() {};
    this.update = function() {};
    this.postCanvas = function() {
      this.c.elt.style.position = 'absolute';
      this.c.elt.style.top = 0;
      this.c.elt.style.left = 0;
      $(this.c.elt).hide().fadeIn(this.fadeInTime);
      if (this.blur) {
        var s = Math.floor(window.innerHeight/50);
        this.c.elt.style['-webkit-filter'] = 'blur('+s*0.5+'px)';
      }
    }
    this.preExit = function() {};
    this.exit = function() {
      this.preExit();
      var s = this.sketch;
      console.log(this.c)
      $(this.c.elt).fadeOut(1000, function(){ 
        s.remove();
      });
    };
    this.black = 100;
    this.blur = true;
    this.width = 620;
    this.height = 440;
    this.dps = false;
    this.fadeInTime = 1000;
    this.sketch;
    this.c;
  }
  return Mode;
});
