define(['jquery', 'p5', './mode'], function ($, p5, Mode) {
    var m = new Mode();

    m.init = function(user) {
      //$('body').append('<div id="fonts" style="position:absolute">TEST</div>');

      new p5(function(p) {
        var s;
        var k = 0;
        var mask;
        p.preload = function() {
          mask = p.loadImage('mask-low-res.png');
        };
        p.setup = function() {
          s = Math.floor(p.windowHeight/15);
          var c = p.createCanvas(20*s, 15*s);
          c.elt.style['-webkit-filter'] = 'blur('+s*0.5+'px)';
          p.noStroke();
        };
        p.draw = function() {
          p.background(127);
          var h = 20;
          for (var i=0; i<p.height; i+=h) {
            p.fill(255, 127+128*p.sin(0.005*(k-i)));
            p.rect(0, i, p.width, h);
          }
          p.image(mask, 0, 0, p.width, p.height);
          k+=h;
        }
      })
    }

    m.next = function(user) {
    }

    return m;
});
