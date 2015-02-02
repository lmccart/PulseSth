define(['jquery', 'pixi', './mode'], function ($, PIXI, Mode) {
    var m = new Mode();

    m.init = function(user) {


      var s = Math.floor(window.innerWidth/140);
      var k = 0;

      // create an new instance of a pixi stage
      var stage = new PIXI.Stage(0xFFFFFF, true);
      
      stage.interactive = true;
      
      var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
       
      // add render view to DOM
      document.body.appendChild(renderer.view);
      
      var graphics = new PIXI.Graphics();
      

      var lights = [];
      for (var i=0; i<window.innerWidth; i+=s) {
        for (var j=0; j<window.innerHeight; j+=s) {
          var l = new PIXI.Graphics();
          stage.addChild(l);
          l.position.x = i;
          l.position.y = j;
          drawLight(l);
          lights.push(l);


        }
      }
      
      var count = 0;
          

      // run the render loop
      requestAnimFrame(animate);
      function animate() {

        for (var i=0; i<lights.length; i++) {
          if (lights[i].position.y === k) {
            lights[i].clear();
            lights[i].off = true;
          } else if (lights[i].off) {
            drawLight(lights[i]);
          }

        }
        k+=s;
        if (k > window.innerHeight) { k = 0; }
        count += 0.1;
        renderer.render(stage);
        requestAnimFrame( animate );
      }

      function drawLight(l) {
        l.beginFill(0xFFFFFF, 0.5);
        l.drawCircle(l.position.x, l.position.y,s);
        l.endFill();
        l.off = false;
      }

    }

    m.next = function(user) {
    }

    return m;
});
