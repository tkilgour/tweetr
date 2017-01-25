$(document).ready(function() {
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */


  // Takes a UNIX timestamp and converts it to 'time ago' eg. (5 days ago)
  // source: http://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
  function timeDifference(datestamp) {

      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = Date.now() - datestamp;

      if (elapsed < msPerMinute) {
           return Math.round(elapsed/1000) + ' seconds ago';
      }

      else if (elapsed < msPerHour) {
           return Math.round(elapsed/msPerMinute) + ' minutes ago';
      }

      else if (elapsed < msPerDay ) {
           return Math.round(elapsed/msPerHour ) + ' hours ago';
      }

      else if (elapsed < msPerMonth) {
          return Math.round(elapsed/msPerDay) + ' days ago';
      }

      else if (elapsed < msPerYear) {
          return Math.round(elapsed/msPerMonth) + ' months ago';
      }

      else {
          return Math.round(elapsed/msPerYear ) + ' years ago';
      }
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweetObj) {
    let $tweet = $(`
      <article class="tweet">
        <header>
          <img class="avatar" src="${tweetObj.user.avatars.small}">
          <span class="name">${escape(tweetObj.user.name)}</span>
          <span class="user-name">${escape(tweetObj.user.handle)}</span>
        </header>
        <div class="tweet-text">${escape(tweetObj.content.text)}</div>
        <footer>
          <span class="date">${timeDifference(tweetObj.created_at)}</span>
          <div class="hover-icons">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </footer>
      </article>
      `);
    return $tweet;
  }

  function renderTweets(arrayOfTweets) {
    for (let tweet of arrayOfTweets) {
      let $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement);
    }
  }

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets/',
    })
    .done(function(response) {
      renderTweets(response);
    })
    .fail(function() {
      console.error('The GET request failed.');
    });
  }

  loadTweets();

  $('#submit-tweet').on('submit', function(event) {
    event.preventDefault();

    let $requestData = $(this).serialize();
    let $tweetText = $(this).find('textarea').val();

    if ($tweetText === "") {
      $('#flash').text('Please enter a tweet');
      $('#flash').fadeIn('fast', function() {
        $(this).delay(2500).fadeOut('fast');
      });
    } else if ($tweetText.length > 140) {
      $('#flash').text('Tweet is over 140 characters');
      $('#flash').fadeIn('fast', function() {
        $(this).delay(2500).fadeOut('fast');
      });
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: $requestData
      })
      .done(() => {
        let $this = $(this);
        $this.find('textarea').val('');
        $this.children('.counter').text('140');
        loadTweets();
      })
      .fail(function() {
        console.error('The POST request failed.');
      });
    }
  });

  $('#compose').on('click', function() {
    $('.container .new-tweet').slideToggle('fast', function(){
      $(this).find('textarea').focus();
    });
  });
});