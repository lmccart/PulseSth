define(function (require) {
    var Manager = require('./manager');
    
    var manager = new Manager();
    manager.start();

    // setInterval(function() {
    //   manager.update();
    // }, 1);

    $( 'body' ).keypress(function(event) {
      if (event.keyCode == 32) {
        manager.next();
      } else if (event.keyCode == 109) {
        var cnv = $('canvas')[0];
        if (cnv.style['-webkit-filter'] == '') {
          var s = Math.floor(window.innerHeight/15);
          cnv.style['-webkit-filter'] = 'blur('+s*0.5+'px)';
        } else {
          cnv.style['-webkit-filter'] = '';
        }
      } else console.log(event.keyCode)
    });

});
