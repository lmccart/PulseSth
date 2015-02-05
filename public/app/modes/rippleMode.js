define(['jquery', 'p5', 'p5.dom', './mode'], function ($, p5, p5dom, Mode) {
    var m = new Mode();
    var brightness = 2;
    var contrast = 1;
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
          v = p.createVideo('vids/ripples.mp4');
          //v.elt.style['-webkit-filter'] = 'blur('+s*0.5+'px)';
          v.hide();
          v.loop();
          m.c = p.createCanvas(m.width, m.height);
          m.postCanvas();
          m.c.elt.style['-webkit-filter'] += 'contrast('+contrast+') brightness('+brightness+')';
          if (m.blur) m.c.elt.style['-webkit-filter'] += ' blur('+s*0.5+'px)';
          setInterval(function(){
            brightness += 0.5;
            if (contrast < 2) {
              contrast += 0.25;
            }
            m.c.elt.style['-webkit-filter'] = 'contrast('+contrast+') brightness('+brightness+')';
            if (m.blur) m.c.elt.style['-webkit-filter'] += ' blur('+s*0.5+'px)';
            v.elt.playbackRate *= 1.5;
          }, 3000);
        };
        p.draw = function() {
          p.image(v, -p.width, -p.height, 3*p.width, 3*p.height);
          p.filter('GRAY');
          if (m.blur) p.image(mask, 0, 0, p.width, p.height);
        }
      })
    }

    return m;
});
