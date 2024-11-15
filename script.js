// Yoinked straight from @Jaja321

$(document).ready(function() {	
    $('#loading').show();
    $('#content-overlay').hide();


    var subreddits = ["quotes", "showerthoughts"]
    var limit = 250
    
    var r = Math.floor(Math.random() * 100);
    var subreddit = subreddits[r%subreddits.length]

    // Load random shower thought quote
    $.getJSON("https://www.reddit.com/r/"+subreddit+"/top.json?sort=top&t=month&limit=100", function(json) {
      var rand = Math.floor(Math.random() * 100);
      var post = json.data.children[rand].data;
      var quote = post.title;
      if (quote.length > limit){
        quote = quote.substring(0,limit) + "..."
      }
      
      
      var author = post.author;
      var quoteurl = post.permalink;
      var upvotes = post.ups;
      var downvotes = post.downs;


      $('#quote').text(quote);
      $('#author').html("u/" + author);
      $('#quoteurl').attr("href", "http://www.reddit.com" + quoteurl);
      $('#upvotes').attr("href", "http://www.reddit.com" + quoteurl);
      $('#downvotes').attr("href", "http://www.reddit.com" + quoteurl);
      $('#quoteurl').html("r/" + subreddit); 
      $('#upvotes').html(upvotes);
      $('#downvotes').html(downvotes);
     
    });
  });
  
  // Convert Imgur URLs to direct links
  var tryConvertUrl = function(url) {
    if (url.indexOf('imgur.com') > 0 || url.indexOf('/gallery/') > 0) {
      if (url.indexOf('gifv') >= 0) {
        if (url.indexOf('i.') === 0) {
          url = url.replace('imgur.com', 'i.imgur.com');
        }
        return url.replace('.gifv', '.gif');
      }
      if (url.indexOf('/a/') > 0 || url.indexOf('/gallery/') > 0) {
        return '';
      }
      return url.replace(/r\/[^ \/]+\/(\w+)/, '$1') + '.jpg';
    }
    return '';
  };
  
