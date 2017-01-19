var twit = require('twit');

var config = require('./config');
var T = new twit(config);

var stream = T.stream('user'); //establishes a user stream

stream.on('tweet', tweetEvent);

function tweetEvent(eventMessage){
	//writes a file with json data when a user tweets at you
	var fs = require('fs'); //node module filesytem
	var json = JSON.stringify(eventMessage, null, 2);
	fs.writeFile("tweet.json", json);

	var reply = eventMessage.in_reply_to_screen_name;
	var text  = eventMessage.text;
	var from = eventMessage.user.screen_name;

	console.log('Someone mentioned you!');

	var username = 'ethklein';
	if (reply === username){	//change my username variable to your handle
		var tweet = '@' + from + ' thank you for mentioning me!';
		tweetIt(tweet);	//sends tweet
	}
}

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
