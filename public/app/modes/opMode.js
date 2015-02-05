define(['jquery', 'p5', 'tween', './mode'], function ($, p5, TWEEN, Mode) {
  var m = new Mode();

  m.init = function(user) {
    //$('body').append('<div id="fonts" style="position:absolute">TEST</div>');

    m.sketch = new p5(function(p) {

      var s;
      var mask;
      var d, f;

      p.preload = function() {
        mask = p.loadImage('mask-low-res.png');
      };
      p.setup = function() {
        p.devicePixelScaling(m.dps);
        s = Math.floor(p.windowHeight/15);
        m.c = p.createCanvas(m.width, m.height);
        m.postCanvas();
        m.c.elt.style['-webkit-filter'] = 'blur(50px)';
        p.noStroke();

        d = 0;
        f = 0.1;

        var tween0 = new TWEEN.Tween( { d: 0} )
          .to( { d: p.height }, 1000 )
          .easing( TWEEN.Easing.Quadratic.InOut )
          .onUpdate(function(){ 
            d = this.d*f;
            if (f < 2.0) {
              f+=0.002;
            }
          })
          .yoyo(true)
          .repeat(Infinity)
          .start();
       
      };
      p.draw = function() {
        p.background(m.black); 
        p.fill(255);
        p.ellipse(p.width/2, p.height/2, d, d);
        if (m.blur) p.image(mask, 0, 0, p.width, p.height);
        TWEEN.update();
      }
    })
  }

  m.exit = function(user) {
    m.sketch.remove();
  }

  return m;
});

