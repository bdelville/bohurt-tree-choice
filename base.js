

//Allow to make an expensive action not to many time to keep things fluids. Because the events can spam
NoSpamEvent = function (minSpan, action) {
  this.last = 0;
  this.minSpan = minSpan;
  this.action = action;
  this.timeout;
  var that = this;

  this.trigger = function (e) {
    var now = Date.now();

    if (now - this.last > this.minSpan) {
      this.action();
      this.last = now
    } else if (!this.timeout) {
      this.timeout = window.setTimeout(this.triggerTimeout, minSpan);
    }
  }

  this.triggerTimeout = function (e) {
    that.timeout = undefined;
    that.trigger();
  }
}


//Base class that contains everything relevant to force the dimension in JavaScript (CSS is crap)
function ScreenInfo() {
  this.init = function () {
    console.log("ScreenInfo is building");

    //TODO check with physical screen size, not UA
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    this.height = $(window).height();
    this.width = $(window).width();

    //Build the size information for the inner screens
    //this.heightReal = this.height - this.topMargin - this.pageTitleHeight;
    this.widthReal = $("#mainContainer")[0].offsetWidth;

    this.landscape = this.width > this.height;
    if (this.height < 1400 && this.width < 1400) {
      this.typeScreen = "small";
    } else {
      this.typeScreen = "standard";
    }

    return this;
  }

  this.pxl = function (pc_1920_1080) {
    //TODO Bigger for mobile devices
    var scale = Math.sqrt(Math.max(this.width, this.height) / 1920);
    return scale * pc_1920_1080;
  }
}

function registerSizeCallback(callback){
    callbacksSize.push(callback);
}

var callbacksSize = [];

$(document).ready(function () {
  var resizedManager = new NoSpamEvent(250, function () {
    console.log("resizedManager is triggered");
    csInfo = new ScreenInfo().init();
    $.each(callbacksSize,function (i,o) {o.call(csInfo)});
  });

  resizedManager.trigger();
  $(window).on('resize', resizedManager.trigger.bind(resizedManager));
});