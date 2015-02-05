define(['jquery', 'p5', './mode'], function ($, p5, Mode) {
    var m = new Mode();
    m.init = function(user) {
      //$('body').append('<div id="fonts" style="position:absolute">TEST</div>');

      m.sketch = new p5(function(p) {
        var s;
        var k = 0;
        var mask;
        var vehicles = [];
        var max = 25;

        p.preload = function() {
          mask = p.loadImage('mask-low-res.png');
        };
        p.setup = function() {
          p.devicePixelScaling(m.dps);
          s = Math.floor(p.windowHeight/15);
          m.c = p.createCanvas(m.width, m.height);
          m.postCanvas();
          p.noStroke();
          for (var i = 0; i < 50; i++) {
            vehicles.push(new Vehicle(p.random(p.width),p.random(p.height)));
          }
          setInterval(function() {
            max += 10;
          }, 1000);
        };
        p.draw = function() {
          p.background(m.black);
  
          for (var i = 0; i < vehicles.length; i++) {
            vehicles[i].separate(vehicles);
            vehicles[i].update();
            vehicles[i].borders();
            vehicles[i].display(); 
          }
          if (m.blur) p.image(mask, 0, 0, p.width, p.height);

        }


        // Vehicle object

        function Vehicle(x, y) {
          // All the usual stuff
          this.position = p.createVector(x, y);
          this.r = 25;
          this.maxspeed = 25;    // Maximum speed
          this.maxforce = 4;  // Maximum steering force
          this.acceleration = p.createVector(0, 0);
            this.velocity = p.createVector(0, 0);

          this.applyForce = function(force) {
            // We could add mass here if we want A = F / M
            this.acceleration.add(force);
          }

          // Separation
          // Method checks for nearby vehicles and steers away
          this.separate = function(vehicles) {
            var desiredseparation = this.r*2;
            var sum = p.createVector();
            var count = 0;
            // For every boid in the system, check if it's too close
            for (var i = 0; i < vehicles.length; i++) {
              var d = p5.Vector.dist(this.position, vehicles[i].position);
              // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
              if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                var diff = p5.Vector.sub(this.position, vehicles[i].position);
                diff.normalize();
                diff.div(d);        // Weight by distance
                sum.add(diff);
                count++;            // Keep track of how many
              }
            }
            // Average -- divide by how many
            if (count > 0) {
              sum.div(count);
              // Our desired vector is the average scaled to maximum speed
              sum.normalize();
              sum.mult(this.maxspeed);
              // Implement Reynolds: Steering = Desired - Velocity
              var steer = p5.Vector.sub(sum, this.velocity);
              steer.limit(this.maxforce);
              this.applyForce(steer);
              this.r = 25+max*this.velocity.mag()/this.maxspeed;
            }
          }

          // Method to update location
          this.update = function() {
            // Update velocity
            this.velocity.add(this.acceleration);
            // Limit speed
            this.velocity.limit(this.maxspeed);
            this.position.add(this.velocity);
            // Reset accelertion to 0 each cycle
            this.acceleration.mult(0);
          }

          this.display = function() {
            p.fill(255);
            p.push();
            p.translate(this.position.x, this.position.y);
            p.ellipse(0, 0, this.r, this.r);
            p.pop();
          }

          // Wraparound
          this.borders = function() {
            if (this.position.x < -this.r) this.position.x =  p.width+this.r;
            if (this.position.y < -this.r) this.position.y = p.height+this.r;
            if (this.position.x > p.width+this.r) this.position.x = -this.r;
            if (this.position.y > p.height+this.r) this.position.y = -this.r;
          }
        }

      })
    }

    return m;
});




