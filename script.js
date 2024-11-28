$(document).ready(function () {
  $('#loading').show();
  $('#content-overlay').hide();

  var subreddits = ["quotes", "showerthoughts"];
  var limit = 250;
  var maxRetries = 3; // Maximum number of retries
  var retryDelay = 1000; // Delay between retries (in milliseconds)

  var r = Math.floor(Math.random() * 100);
  var subreddit = subreddits[r % subreddits.length];

  function fetchData(retriesLeft) {
    $.ajax({
      url: "https://www.reddit.com/r/" + subreddit + "/top.json?sort=top&t=month&limit=100&nocache=" + new Date().getTime(),
      method: "GET",
      dataType: "json",
      success: function (json) {
        try {
          var rand = Math.floor(Math.random() * 100);
          var post = json.data.children[rand].data;
          var quote = post.title;
          if (quote.length > limit) {
            quote = quote.substring(0, limit) + "...";
          }

          var author = post.author;
          var quoteurl = post.permalink;
          var upvotes = post.ups;
          var downvotes = post.downs;

          $('#quote').text(quote);
          $('#author').html("u/" + author);
          $('#author').attr("href", "http://www.reddit.com" + "/u/" + author);
          $('#quoteurl').html("r/" + subreddit);
          $('#quoteurl').attr("href", "http://www.reddit.com" + quoteurl);
          $('#downvotes').html(downvotes);
          $('#downvotes').attr("href", "http://www.reddit.com" + quoteurl);
          $('#upvotes').html(upvotes);
          $('#upvotes').attr("href", "http://www.reddit.com" + quoteurl);

          $('#loading').hide();
          $('#content-overlay').show();
        } catch (err) {
          console.error("Error processing JSON data:", err);
          $('#quote').text("Error processing data. Please try again later.");
        }
      },
      error: function (xhr, status, error) {
        console.error("Failed to fetch data:", error);
        if (retriesLeft > 0) {
          console.log(`Retrying... (${maxRetries - retriesLeft + 1}/${maxRetries})`);
          setTimeout(function () {
            fetchData(retriesLeft - 1);
          }, retryDelay);
        } else {
          $('#quote').text("Unable to load quote. Please refresh the page.");
          $('#loading').hide();
          $('#content-overlay').show();
        }
      }
    });
  }

  // Initial fetch
  fetchData(maxRetries);
});
