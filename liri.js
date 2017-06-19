var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var request = require('request');
var fs = require('fs');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var spotify = new Spotify({
  id: "accb9c432d494df48d2e66f5b6f6637f",
  secret: "cb9bc119442042e6a422749abb04f682"
});
 

// console.log(keys.twitterKeys.consumer_key);
var myCommand = process.argv[2];

switch(myCommand){
	case "my-tweets":
		twitter();
		// console.log('my-tweets');
		break;
	case "spotify-this-song":
		// console.log('spotify-this-song');
	
		spotifySearch();
		break;
	case "movie-this":
		ombdSearch();
		// console.log('movie-this');
		break;
	case "do-what-it-says":
		doWhatItSays();
		// console.log('do-what-it-says');
	default:
		// console.log('wtf');

}

function twitter(){
	var twitterName = process.argv[3];
	var params = {
		screen_name: 'VinceFiorilli',
		count: 20
	}
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if(error){
	  	console.log(error);
	  }
	  	for(var i = 0; i < tweets.length; i++){
	  		console.log("Tweet: " + [i + 1] + " " + tweets[i].text);
	  		console.log("Created at: " + tweets[i].created_at);
	  	}
	  
	  // console.log(tweets);  // The favorites. 
	  // console.log(response);  // Raw response object. 
	});
}

function spotifySearch(bool){
	var spotifySong = process.argv[3];
	if(bool !== undefined){
		spotifySong = bool;
	}

	spotify.search({ type: 'track', query: spotifySong, limit: '1' }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
  	}
 
	// console.log(data.tracks.items[0]); 
	console.log("Band Name: " + data.tracks.items[0].artists[0].name);
	console.log("Song Name: " + data.tracks.items[0].name);
	console.log("Preview Url: " + data.tracks.items[0].preview_url);
	console.log("Album Name: " + data.tracks.items[0].album.name);
	
});

}

function ombdSearch(){
	var movieSearch = process.argv[3];
	 if(movieSearch.length == 0){
		movieSearch = "Mr.Nobody";
	}

		request("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
			if(error){
		  		console.log('error:', error); // Print the error if one occurred 
	  	}
		// var movieData = JSON.parse(body);
	 		console.log(response.Title);
		  console.log("why"); // Print the HTML for the Google homepage. 
		  console.log("Movie Title: ");
		  console.log("Year: ");
		  console.log("Rating: ");
		  console.log("Country: ");
		  console.log("Language: ");
		  console.log("Plot: ");
		  console.log("Actors: ");
		  console.log("Rotten Tomatoes: ");
		
		});
	
}

function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data){
		if (error) {
    		return console.log(error);
  		}
  		// console.logdata);

  		var dataArray = data.split(",");
  		// console.log(dataArray);
  		spotifySearch(dataArray[1]);
  		
	});
}