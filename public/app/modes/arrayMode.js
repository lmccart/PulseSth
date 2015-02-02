define(['jquery', 'p5', './mode'], function ($, p5, Mode) {
    var m = new Mode();
    var sketch;

    // 2D Array of objects
    var grid = [];

    // Number of columns and rows in the grid
    var cols = 20;
    var rows = 28;
    var h;

    m.init = function(user) {
      //$('body').append('<div id="fonts" style="position:absolute">TEST</div>');

      sketch = new p5(function(p) {

        // A Cell object
        function Cell(x_, y_, w_, h_, a_) {
          this.x = x_;
          this.y = y_;
          this.w = w_;
          this.h = h_;
          this.angle = a_;

          this.oscillate = function() {
            this.angle += 0.02; 
          };

          this.display = function() {
            p.noStroke();
            //stroke(255);
            // Color calculated using sine wave

            var v = 127+127*p.sin(this.angle);
            v = v * this.y/p.height;
            p.fill(v);
            p.rect(this.x, this.y, this.w, this.h); 
          }
        }

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
          h = p.int(p.width/cols);
          for (var i=0; i<cols; i++) {
            grid[i] = [];
            for (var j = 0; j < rows; j++) {
              // Initialize each object
              grid[i][j] = new Cell(i*h,j*h*.5,h*5,h,i);
            }
          }
        };
        p.draw = function() {
          p.background(255); 
          for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
              // Oscillate and display each object
              grid[i][j].oscillate();
              grid[i][j].display();
            }
          }
          p.image(mask, 0, 0, p.width, p.height);
        }
      })
    }

    m.exit = function(user) {
      sketch.remove();
    }

    return m;
});

