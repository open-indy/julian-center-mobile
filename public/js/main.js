// run two different counters
// calculate the time between sunrise and now and calculate the number

$(document).ready(function(){

  // init flip clock
  $('.timer-clock').FlipClock({
    clockFace: 'MinuteCounter',
    callbacks: {
      interval: function() {
        checkVals();
      }
    }
  });

  // update flipper values
  var i = 0;
  var womanCount = 0;
  var childCount = 0;
  function checkVals() {
    if ((i !== 0) && (i % 9 === 0)) {
      womanCount++;
      $('.women-number').html(womanCount);
      if (womanCount === 1) {
        $('.women-noun').html('woman has');
      } else {
        $('.women-noun').html('women have');
      }
    }
    if ((i !== 0) && (i % 120 === 0))  {
      childCount++;
      $('.child-number').html(childCount);
      if (childCount === 1) {
        $('.child-noun').html('child has');
      } else {
        $('.child-noun').html('children have');
      }
    }
    i++;
  }

});
