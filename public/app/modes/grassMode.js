define(['jquery', 'p5', 'p5.dom', './mode'], function ($, p5, p5dom, Mode) {
    var m = new Mode();
    var brightness = 1;
    var contrast = 1.5;
    var c;
    var s;

    m.init = function(user) {
      //$('body').append('<div id="fonts" style="position:absolute">TEST</div>');

      m.sketch = new p5(function(p) {
        var v;
        var mask;
        p.preload = function() {
          mask = p.loadImage('mask-low-res.png');
        };
        p.setup = function() {
          p.devicePixelScaling(m.dps);
          s = Math.floor(p.windowHeight/15);
          v = p.createVideo('vids/grass.mp4');
          v.hide();
          v.loop();
          m.c = p.createCanvas(m.width, m.height);
          m.postCanvas();
          m.c.elt.style['-webkit-filter'] = 'contrast('+contrast+') brightness('+brightness+')';
          if (m.blur) m.c.elt.style['-webkit-filter'] += ' blur('+s*0.5+'px)';
        };
        p.draw = function() {
          p.image(v, -0.25*p.width, -0.25*p.height, 1.5*p.width, 1.65*p.height);
          p.filter('GRAY');
          p.filter('INVERT');
          if (m.blur) p.image(mask, 0, 0, p.width, p.height);
        }
      })
    }

    return m;
});
