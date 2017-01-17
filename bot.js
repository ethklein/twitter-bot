console.log('the bot is starting');

var twit = require('twit'); //import twit package

var config = require('./config.js'); //using config.js for storing keys 
var T = new twit(config);

//searching for tweets with text: computer science --> change arguments of search() to change search term & number
function search(query, number){
		var params = {
		q: query,
		count: number
	}

	T.get('search/tweets', params, gotData);

	function gotData(err, data, response){
		var tweets = data.statuses;
		for (var i=0; i<tweets.length; i++){
			console.log(tweets[i].text);
		}
	}
}



//posting tweets to twitter --> change argument of tweetIt() call

function tweetIt(message){

	
	var tweet = {
		status: message
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response){
		if (err){
			console.log("Something went wrong");
		} else {
			console.log("It worked.");
		}
	}
}

//Function tests:
var term = "computer science";
var count = 2;
search(term, count);
tweetIt("sample text to post");

