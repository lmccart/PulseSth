define(['jquery', './mode'], function (Mode) {
    var DebugMode = new Mode();

    DebugMode.init = function(user) {
      $('body').append('<div id="fonts" style="width:500px">TEST</div>');
    }

    DebugMode.next = function(user) {
    }

    return DebugMode;
});
