$(document).ready(function() {
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */


  // Takes a UNIX timestamp and converts it to 'time ago' eg. (5 days ago)
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
      $('#tweets-container').append($tweetElement);
    }
  }

  // Fake data taken from tweets.json
  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1482222498088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 146113796368
    }
  ];

  renderTweets(data);

  $('.tweet').hover(function() {
    $(this).find(".hover-icons").css("visibility", "visible");
    $(this).css("border-color", "#888");
    $(this).find(".avatar").css("filter", "saturate(100%)")
  }, function() {
    $(this).find(".hover-icons").css("visibility", "hidden");
    $(this).css("border-color", "#ddd");
    $(this).find(".avatar").css("filter", "saturate(60%)");
  });


});