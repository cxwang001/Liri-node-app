var fs = require("fs");							
var keys = require("./keys.js");				
var Twitter = require("twitter");					
var request = require("request");				
var spotify = require("spotify");	
var client = new Twitter(keys.twitterKeys);
var action = process.argv[2];


switch (action) {
  case "my-tweets":
    my_tweets();
    break;

  case "spotify-this-song":
    spotify_this_song();
    break;

  case "movie-this":
    movie_this();
    break;

  case "do-what-it-says":
    do_what_it_says();
    break;
}			

function my_tweets() {

	var params = {screen_name: '@Cxwang0001'};
	
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (error) {
    	return console.log(err);
    	}
    	console.log(response);
    	for (var i = 0; i < 2; i++) {
    		console.log(tweets[i].text);
    	};


	});
}

function movie_this(){

	var movieName = process.argv[3];

// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

  // If the request is successful
  	if (!error && response.statusCode === 200) {

 		console.log("Title of the movie: " + JSON.parse(body).Title);
    	console.log("Year the movie came out: " + JSON.parse(body).Year);
    	console.log("IMDB Rating of the move: " + JSON.parse(body).Year);
    	console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).imdbRating);
    	console.log("Country where the movie was produced: " + JSON.parse(body).Country);
    	console.log("Language of the move: " + JSON.parse(body).Language);
    	console.log("Plot of the movie: " + JSON.parse(body).Plot);
    	console.log("Actors in the movie: " + JSON.parse(body).Actors);
  		}
	});
}