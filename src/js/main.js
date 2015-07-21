// run two different counters
// calculate the time between sunrise and now and calculate the number

$(document).ready(function(){

  var startMin = 5;
  var womenSec = 9;
  var childrenSec = 120;
  var startWomen = parseInt((startMin * 60) / womenSec);
  var startChildren = parseInt((startMin * 60) / childrenSec);
  var startCount = startWomen + startChildren;

  var clock = $('.counter').FlipClock(startCount, {
    clockFace: 'Counter'
  });

  var sec = 1;
  setInterval(function() {
    if ((sec % childrenSec) == 0) {
      clock.increment();
    } else if ((sec % womenSec) == 0) {
      clock.increment();
    }

    sec++;
  }, 1000);
});
