console.log('the bot is starting');

var twit = require('twit'); //import twit package

var config = require('./config.js'); //using config.js for storing keys 

var T = new twit(config);

