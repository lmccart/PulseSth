define(['jquery', 'two', './mode'], function ($, Two, Mode) {
    var m = new Mode();

    m.init = function(user) {

      $(function() {

        var type = 'webgl';//(canvas|webgl)/.test(url.type) ? url.type : 'svg';
        var two = new Two({
          width: 140,
          height: 100,
          type: Two.Types[type],
          fullscreen: false,
          autostart: true
        }).appendTo(document.body);

        var s = Math.floor(two.width/140);
        var k = 0;

        Two.Resoultion = 32;

        var lights = [];
        for (var i=0; i<two.width; i+=s) {
          for (var j=0; j<two.height; j+=s) {

            var ball = two.makeCircle(i+s/2, j+s/2, s/2);
            ball.noStroke().fill = 'red';

            lights.push(ball);

          }
        }

        two.bind('update', function() {

          lights[k].fill = 'rgba(0, 200, 255, 0.75)';
          k++;
          if (k <= lights.length) {
            k = 0;
          }


          // delta.copy(mouse).subSelf(ball.translation);

          // _.each(ball.vertices, function(v, i) {

          //   var dist = v.origin.distanceTo(delta);
          //   var pct = dist / radius;

          //   var x = delta.x * pct;
          //   var y = delta.y * pct;

          //   var destx = v.origin.x - x;
          //   var desty = v.origin.y - y;

          //   v.x += (destx - v.x) * drag;
          //   v.y += (desty - v.y) * drag;

          // });

          // ball.translation.addSelf(delta);

        });

      });
    }

    m.next = function(user) {
    }

    return m;
});
