// randomize the masthead background image
var number = Math.floor(Math.random() * 2) === 0 ? '1' : '2' ;
$('.masthead').css('background-image', 'url(../img/woman' + number + '.jpg)');

$(document).ready(function(){
  var startMin = 5;
  var womenSec = 9;
  var childrenSec = 120;
  var startWomen = parseInt((startMin * 60) / womenSec);
  var startChildren = parseInt((startMin * 60) / childrenSec);
  var startCount = startWomen + startChildren;

  // initialize the counter
  var clock = $('.counter').FlipClock(startCount, {
    clockFace: 'Counter'
  });

  // cumulative victim count
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
