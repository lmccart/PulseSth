define(['jquery', 'p5', './mode'], function ($, p5, Mode) {
  var m = new Mode();
  
  m.init = function(user) {
    //$('body').append('<div id="fonts" style="position:absolute">TEST</div>');

    m.sketch = new p5(function(p) {


      var resolutionX = 200;
      var resolutionY = 150;
      var flow = [];
      var density = [];
      var wind = []; // horizontal bands
      var particleCount = 1000;//64192/100;
      var particles = [];
      var currentParticle;


      function Particle(x, y) {
        this.position = new p5.Vector(x, y);
        this.velocity = new p5.Vector(0.01 - p.random(0.02), 0.01 - p.random(0.02));
        this.timer = p.int(p.random(120));
       
        this.update = function() {
          var cellX = p.int(this.position.x);
          var cellY = p.int(this.position.y);
       
       
          flow[cellX][cellY].x = flow[cellX][cellY].x * 0.95 + this.velocity.x * 0.05;
          flow[cellX][cellY].y = flow[cellX][cellY].y * 0.95 + this.velocity.y * 0.05;
          density[cellX][cellY] += 0.1;
          flow[cellX][cellY].limit(1);
       
          this.velocity.x += 0.2 * flow[cellX][cellY].x;
          this.velocity.y += 0.2 * flow[cellX][cellY].y;
          //velocity.y += 0.01 * wind[cellY];
       
          this.velocity.mult(0.9);
       
          this.position.x = (this.position.x + this.velocity.x + resolutionX) % resolutionX;
          this.position.y = (this.position.y + this.velocity.y + resolutionY) % resolutionY;
       
          this.timer++;
          if (this.timer > 240) {
            this.timer = p.int(p.random(120));
            this.position = new p5.Vector(p.random(resolutionX),
            p.random(resolutionY));
            this.velocity = new p5.Vector(-1 + p.random(2), -1 + p.random(2));
          }
        };
       
        this.draw = function(zoom) {
          p.stroke(0, p.min(255, p.int(255 * p.abs(this.velocity.x) / 0.2)),
            p.min(255, p.int(255 * p.abs(this.velocity.y / 0.2))));
          p.line(zoom * this.position.x, zoom * this.position.y,
          zoom * (this.position.x + this.velocity.x),
          zoom * (this.position.y + this.velocity.y));
        };
      }



      var mask;
      p.preload = function() {
        mask = p.loadImage('mask-low-res.png');
      };
      p.setup = function() {
        p.devicePixelScaling(m.dps);
        s = Math.floor(p.windowHeight/resolutionY);
        m.c = p.createCanvas(m.width, m.height);

        for (var i = 0; i<resolutionX; i++) {
          flow[i] = [];
          density[i] = [];
        }

        for (var y = 0; y < resolutionY; y++) {
          wind[y] = 1 * p.sin(4 * p.PI * y / resolutionY);
          for (var x = 0; x < resolutionX; x ++) {
            flow[x][y] = new p5.Vector();
            //flow[x][y] = new PVector(0.2 - random(0.4), 0.2 - random(0.4));
          }
        }

        for (var i = 0; i < particleCount; i ++) {
          particles[i] = new Particle(p.random(resolutionX), p.random(resolutionY));
        }

      };
      p.draw = function() {
        p.fill(0);
        p.rect(0, 0, p.width, p.height);
        //p.scale(1.04);
        var zoom = 20;//p.min(p.width / resolutionX, p.height / resolutionY);
         
        for (var y = 0; y < resolutionY; y++) {
          for (var x = 0; x < resolutionX; x++) {
            density[x][y] = 0;
          }
        }
         
        // Particles?
        p.stroke(255);
        for (var i = 0; i < particleCount; i++) {
          particles[i].update();
          //particles[i].draw(zoom);
        }


        p.noStroke();
        for (var y = 0; y < resolutionY; y++) {
          for (var x = 0; x < resolutionX; x++) {
            p.fill(p.int(p.max(0, p.min(255, 255 * density[x][y]))));
            p.rect(x * zoom, y * zoom, zoom, zoom);
          }
        }
        if (m.blur) p.image(mask, 0, 0, p.width, p.height);
      }
    })
  }


  return m;
});



