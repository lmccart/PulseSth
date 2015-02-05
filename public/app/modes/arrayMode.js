define(['jquery', 'p5', './mode'], function ($, p5, Mode) {
    var m = new Mode();

    // 2D Array of objects
    var grid = [];

    // Number of columns and rows in the grid
    var cols = 20;
    var rows = 28;
    var h;
    m.init = function(user) {
      //$('body').append('<div id="fonts" style="position:absolute">TEST</div>');

      m.sketch = new p5(function(p) {

        // A Cell object
        function Cell(x_, y_, w_, h_, a_) {
          this.x = x_;
          this.y = y_;
          this.w = w_;
          this.h = h_;
          this.angle = a_;

          this.oscillate = function() {
            this.angle += p.random(-1, 0.25); 
          };

          this.display = function() {
            p.noStroke();
            //stroke(255);
            // Color calculated using sine wave

            var v = 180+75*p.sin(this.angle);
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
          p.devicePixelScaling(m.dps);
          s = Math.floor(p.windowHeight/15);
          m.c = p.createCanvas(m.width, m.height);
          m.postCanvas();
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
          if (m.blur) p.image(mask, 0, 0, p.width, p.height);
        }
      })
    }


    return m;
});

