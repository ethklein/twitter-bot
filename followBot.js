var twit = require('twit'); //import twit package

var config = require('./config.js'); //using config.js for storing keys 
var T = new twit(config);

var stream = T.stream('user');	//sets up the user stream

stream.on('follow', followed); //if someone follows me


function followed(eventMsg){
	var name  = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('@' + screenName + ' thank you for following me!');	//thanks followers for following you
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