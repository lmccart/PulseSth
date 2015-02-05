define(['jquery', 'p5', './mode'], function ($, p5, Mode) {
    var m = new Mode();

    m.init = function(user) {
      //$('body').append('<div id="fonts" style="position:absolute">TEST</div>');

      m.sketch = new p5(function(p) {
        var s;
        var k = 0;
        var mask;
        p.preload = function() {
          mask = p.loadImage('mask-low-res.png');
        };
        p.setup = function() {
          p.devicePixelScaling(m.dps);
          s = Math.floor(p.windowHeight/15);
          m.c = p.createCanvas(m.width, m.height);
          m.postCanvas();
          p.noStroke();
        };
        p.draw = function() {
          p.background(m.black);
          var h = 20;
          for (var i=0; i<p.height; i+=h) {
            p.fill(255, 127+128*p.sin(0.005*(k-i)));
            p.rect(0, i, p.width, h);
          }
          if (m.blur) p.image(mask, 0, 0, p.width, p.height);
          k+=h;
        }
      })
    }

    return m;
});
