define(['jquery', 'p5', './mode'], function ($, p5, Mode) {
    var m = new Mode();
    var sketch;

    m.init = function(user) {

      sketch = new p5(function(p) {


        function Ball(id, ballsize, col, followcol, fleecol) {
          this.id = id;
          this.pos = new p5.Vector(p.random(0,p.width),p.random(0,p.height));
          this.ballsize = ballsize;
          this.fleecol = fleecol;
          this.followcol = followcol;
          this.speed = new p5.Vector(3, 3);
          this.searchradius = 50;
          this.damping = 0.1;
          this.maxspeed = 3;
          this.mass = ballsize;

          // this.warpWall = function() {
          //   if (this.pos.x<0) this.pos.x+=p.width;
          //   else if (this.pos.x>=p.width) this.pos.x-=p.width;
          //   if (this.pos.y<0) this.pos.y+=p.height;
          //   else if (this.pos.y>=p.height) this.pos.y-=p.height;
          // }
          this.bounceWall = function() {
            this.pos.x = p.constrain(this.pos.x, this.ballsize, p.width-this.ballsize);
            this.pos.y = p.constrain(this.pos.y, this.ballsize, p.height-this.ballsize);
            
            // check border. This is simply "flipping" the according speed component
            if (this.pos.x<=this.ballsize) this.speed.x=p.abs(this.speed.x);
            if (this.pos.x>=p.width-this.ballsize) this.speed.x=p.abs(this.speed.x)*(-1);
            if (this.pos.y<=this.ballsize) this.speed.y=p.abs(this.speed.y);
            if (this.pos.y>=p.height-this.ballsize) this.speed.y=p.abs(this.speed.y)*(-1);
          }
           
          this.moveBall = function() {
            if (this.speed.mag()>this.maxspeed) {
              this.speed.normalize();
              this.speed.mult(this.maxspeed);
            }
            this.pos.add(this.speed);
            //this.warpWall();
            this.bounceWall();
          }
             
          this.adjustBall = function(goal, attract, strength, bDraw) {
            if (bDraw) {
              p.strokeWeight(1);
              if (attract) p.stroke(p.color(0,255,0,100));
              else p.stroke(p.color(255,0,0,100));
              p.line(this.pos.x, this.pos.y, goal.x, goal.y);
            }
            var acc = p5.Vector.sub(goal, this.pos);
            acc.normalize();
            acc.mult(this.damping*strength);
            if (!attract) acc.mult(-1);
            this.speed.add(acc);
            return;
          }
          
          this.findGravity = function(checkcol) {
            var count=0;
            var g = new p5.Vector(0,0);
            for (var i=0; i<balls.length; i++) {
              var b = balls[i];
              if (this.pos.dist(b.pos)<=this.searchradius) {
                if (this.id !== b.id) {
                  count++;
                  g.add(p.pos);  
                }
              }
            }
            g.mult(1/count);
            return g;
          }
           
          this.drawBall = function() {
            p.stroke(255);//this.ballcol);
            p.strokeWeight(this.ballsize*2);
            p.point(this.pos.x, this.pos.y);
          }
        }

        var s;
        var mask;

        var balls = [];
        var b, b2;
        var maxballs = 50;
        var g, g2;
        var k=1;
        var ballsizeGlobal = 30;
        var maxcol = 5;
        var bounce = true;
        var fade = true;
        var showforce = false;

        p.preload = function() {
          mask = p.loadImage('mask-low-res.png');
        };
        p.setup = function() {
          s = Math.floor(p.windowHeight/15);
          var c = p.createCanvas(20*s, 15*s);
          c.elt.style['-webkit-filter'] = 'blur('+s*0.5+'px)';
          // p.colorMode(p.HSB,maxcol,1,1);
          // for (var j=0;j<maxcol;j++) {
          //   for (var i=0;i<maxballs;i++) {
          //     b = new Ball(ballsizeGlobal,255,0,255);
          //     balls.push(b);
          //   }
          // }
          for (var i=0;i<maxballs;i++) {
            b = new Ball(i, ballsizeGlobal,255, 0, 255);
            balls.push(b);
          }  
          //p.colorMode(p.RGB,255,255,255);

        };
        p.draw = function() {
          p.background(0); 

          for (var i=0; i<balls.length;i++) {
            balls[i].drawBall();
          }
          for (var i=0; i<balls.length;i++) {
            g = balls[i].findGravity(balls[i].followcol);
            balls[i].adjustBall(g,true,1,showforce);
               
            g2 = balls[i].findGravity(balls[i].fleecol);
            balls[i].adjustBall(g2,false,0.7,showforce);

          }
          if (bounce) {
            for (var i=0; i<balls.length-1;i++) {
              for (var j=i+1;j<balls.length;j++) {
                b = balls[i];
                b2 = balls[j];
                var v = p5.Vector.sub(b2.pos,b.pos);
                var d=p.mag();
                if (d<=b.ballsize+b2.ballsize) {
                  v.normalize();                          
                  d -= (b.ballsize+b2.ballsize);
                  var n=b.speed.mag()+b2.speed.mag();
                  b.pos.add(p5.Vector.mult(v,d*b.speed.mag()/(n)));
                  b2.pos.add(p5.Vector.mult(v,-1*d*b2.speed.mag()/(n)));
                  var n = new PVector(v.y,v.x*(-1),0); // normal vector to collision direction
                  var vp1 = b.speed.dot(v);     // velocity of P1 along collision direction
                  var vn1 = b.speed.dot(n);     // velocity of P1 normal to collision direction
                  var vp2 = b2.speed.dot(v);     // velocity of P2 along collision direction
                  var vn2 = b2.speed.dot(n);     // velocity of P2 normal to collision direction
                // calculate collison
                  var vp1_after=0;
                  var vp2_after=0;
                  vp1_after = (b.mass*vp1+b2.mass*(2*vp2-vp1))/(b.mass+b2.mass)*1;
                  vp2_after = (b.mass*(2*vp1-vp2)+b2.mass*vp2)/(b.mass+b2.mass)*1;
                  b.speed=p5.Vector.add(p5.Vector.mult(v,vp1_after),p5.Vector.mult(n,vn1));
                  b2.speed=p5.Vector.add(p5.Vector.mult(v,vp2_after),p5.Vector.mult(n,vn2));
                }
              }
            }
          }
          for (var i=0; i<balls.length;i++) {
            balls[i].moveBall();
          }

          //p.image(mask, 0, 0, p.width, p.height);
        }
      });
    }

    m.exit = function(user) {
      sketch.remove();
    }

    return m;
});




