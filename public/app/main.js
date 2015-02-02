define(function (require) {
    var Manager = require('./manager');
    
    var manager = new Manager();
    manager.start();

    // setInterval(function() {
    //   manager.update();
    // }, 1);

});
