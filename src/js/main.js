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
  
  setupNewsletterSignup();
  
});

function setupNewsletterSignup() {
  $('#submit-signup').click(function (event) {
    event.preventDefault();
    
    var emailAddress = $('#newsletter-email').val();
    
    signUpSubscriber({ emailAddress: emailAddress});
    
  });
}

function signUpSubscriber(subscriber) {
  $.ajax({
    url: '/api/v1/newsletter/signup',
    method: 'POST',
    data: subscriber,
    beforeSend: signUpSubscriber_beforeSend,
    success: signUpSubscriber_success,
    error: signUpSubscriber_error,
    complete: signUpSubscriber_complete
  });
}

function signUpSubscriber_beforeSend() {
  $('#submit-signup').text('Submitting...');
}

function signUpSubscriber_success(data, status, xhr) {
  if (data && data.status === 'success') {
    $('#submission-result').empty().append('<span>Success!</span>');
  } else {
    $('#submission-result').empty().append('<span>Error!</span>');
    $('#newsletter-email').addClass('error');
  }
}

function signUpSubscriber_error(xhr, status, e) {
  var error = xhr.responseJSON;
  
  $('#submission-result').empty().append('<span>' + error.message + '</span>');
  $('#newsletter-email').addClass('error');
}


function signUpSubscriber_complete() {
  $('#submit-signup').text('Submit');
}
