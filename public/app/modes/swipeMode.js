define(['jquery', 'p5', 'tween', './mode'], function ($, p5, TWEEN, Mode) {
  var m = new Mode();
  var tweens = [];

  m.init = function(user) {
    //$('body').append('<div id="fonts" style="position:absolute">TEST</div>');

    m.sketch = new p5(function(p) {

      var s;
      var mask;
      var x0;
      var x1;

      p.preload = function() {
        mask = p.loadImage('mask-low-res.png');
      };
      p.setup = function() {
        p.devicePixelScaling(m.dps);
        s = Math.floor(p.windowHeight/15);
        m.c = p.createCanvas(m.width, m.height);
        m.postCanvas();
        p.noStroke();

        x0 = -p.width;
        y0 = -p.height;
        x1 = p.width;
        y1 = p.height;
        var dur = 750;

        var tween0 = new TWEEN.Tween( { x: -p.width} )
          .to( { x: 0 }, dur )
          .easing( TWEEN.Easing.Exponential.In )
          .onUpdate(function(){ x0 = this.x})
        tweens.push(tween0);

        var tween1 = new TWEEN.Tween( { y: -p.height} )
          .to( { y: 0 }, dur )
          .easing( TWEEN.Easing.Exponential.In )
          .onUpdate(function(){ y0 = this.y })
          tweens.push(tween1);

        var tween2 = new TWEEN.Tween( { x: p.width} )
          .to( { x: 0 }, dur )
          .easing( TWEEN.Easing.Exponential.In )
          .onUpdate(function(){ x1 = this.x})
        tweens.push(tween2);

        var tween3 = new TWEEN.Tween( { y: p.height} )
          .to( { y: 0 }, dur )
          .easing( TWEEN.Easing.Exponential.In )
          .onUpdate(function(){ y1 = this.y })
        tweens.push(tween3);


        var tween4 = new TWEEN.Tween( { x: -p.width} )
          .onStart(function() {
            x0 = -p.width;
            y0 = p.height;
            x1 = p.width;
            y1 = -p.height;
          })
          .to( { x: 0 }, dur )
          .easing( TWEEN.Easing.Exponential.In )
          .onUpdate(function(){ x0 = this.x})
        tweens.push(tween4);

        var tween5 = new TWEEN.Tween( { y: p.height} )
          .to( { y: 0 }, dur )
          .easing( TWEEN.Easing.Exponential.In )
          .onUpdate(function(){ y0 = this.y })
        tweens.push(tween5);

        var tween6 = new TWEEN.Tween( { x: p.width} )
          .to( { x: 0 }, dur )
          .easing( TWEEN.Easing.Exponential.In )
          .onUpdate(function(){ x1 = this.x})
        tweens.push(tween6);

        var tween7 = new TWEEN.Tween( { y: -p.height} )
          .to( { y: 0 }, dur )
          .easing( TWEEN.Easing.Exponential.In )
          .onUpdate(function(){ y1 = this.y })
        tweens.push(tween7);

        tween0.chain(tween1)
        tween1.chain(tween2)
        tween2.chain(tween3)
        tween3.chain(tween4)
        tween4.chain(tween5)
        tween5.chain(tween6)
        tween6.chain(tween7)
        tween0.start();
       
      };
      p.draw = function() {
        p.background(255); 
        p.fill(m.black);
        p.rect(x0, 0, p.width, p.height);
        p.fill(255);
        p.rect(0, y0, p.width, p.height);
        p.fill(m.black);
        p.rect(x1, 0, p.width, p.height);
        p.fill(255);
        p.rect(0, y1, p.width, p.height);
        if (m.blur) p.image(mask, 0, 0, p.width, p.height);
        TWEEN.update();
      }
    })
  }

  m.preExit = function() {
    console.log('pre')
    for (var i=0; i<tweens.length; i++) {
      tweens[i].stop();
    }
  }

  return m;
});

