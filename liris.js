//NPM for file system
var fs = require("fs");							
var keys = require("./keys.js");				
//NPM for Twitter
var Twitter = require("twitter");					
var request = require("request");				
var Spotify = require('node-spotify-api');
var client = new Twitter(keys.twitterKeys);

//Two global valubles
var action = process.argv[2];
var value = process.argv[3];

//switch function
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
//Twitter function
function my_tweets() {

	var params = {screen_name: '@Cxwang0001'};
	
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (error) {
    	return console.log(err);
    	}
      for (var i = 0; i < tweets.length; i++) {
    	     console.log((tweets[i].text) + " created on " + (tweets[i].created_at));
      }
  });

};


//Spotify function
function spotify_this_song(){
 
  var spotify = new Spotify({
  id: 'fc8a55cd68624873bb2a8469c15e880a',
  secret: '32d3c73bf7264419b0d885f7ae5d8202'
  });
  //default to "The Sign"
  if (!value ) {
    value = "The Sign";
  };

  spotify.search({ type: 'track', query: value, limit:1 }, function(err, data) {
    if (err) {
     console.log('Error occurred: ', err);
    } else{
      // console.log(data);
      var songs = data.tracks.items;
      // console.log(songs);
      console.log("The artists: " + songs[0].artists[0].name);
      console.log("The song's name: " + songs[0].name); 
      console.log("A preview link from Spotify: " + songs[0].preview_url); 
      console.log("The album name: " + songs[0].album.name);

      fs.appendFile("log.txt", "Spotify results", function(err) {
        if (err) {
          return console.log(err);
        } 
      });
      fs.appendFile("log.txt", "The artists: " + songs[0].artists[0].name, function(err) {
        if (err) {
          return console.log(err);
        }
      });
      fs.appendFile("log.txt", "The song's name: " + songs[0].name, function(err) {
        if (err) {
          return console.log(err);
        }
      });
      fs.appendFile("log.txt", "A preview link from Spotify: " + songs[0].preview_url, function(err) {
        if (err) {
          return console.log(err);
        }
      }); 
      fs.appendFile("log.txt", "The album name: " + songs[0].album.name, function(err) {
        if (err) {
          return console.log(err);
        }
      });  
    }  
  });
};

//Movie function
function movie_this(){

  //default to Mr. Nobody movie
  if (!value ) {
    value = "Mr. Nobody";
  };
// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

  // If the request is successful
  	if (!error && response.statusCode === 200) {

      console.log("Title of the movie: " + JSON.parse(body).Title);
      console.log("--------------------------------------------------------------");
    	console.log("Year the movie came out: " + JSON.parse(body).Year);
      console.log("--------------------------------------------------------------");
    	console.log("IMDB Rating of the move: " + JSON.parse(body).Year);
      console.log("--------------------------------------------------------------");
    	console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).imdbRating);
      console.log("--------------------------------------------------------------");
    	console.log("Country where the movie was produced: " + JSON.parse(body).Country);
      console.log("--------------------------------------------------------------");
    	console.log("Language of the move: " + JSON.parse(body).Language);
      console.log("--------------------------------------------------------------");
    	console.log("Plot of the movie: " + JSON.parse(body).Plot);
      console.log("--------------------------------------------------------------");
    	console.log("Actors in the movie: " + JSON.parse(body).Actors);
      console.log("--------------------------------------------------------------");
  		}
	});
}

//do what it says function
function do_what_it_says() {

	fs.readFile("random.txt", 'utf8', function(error, data){
		if (error) {
    	return console.log(error);
  		}
    
    var dataArr = data.split(",");
   
    // console.log(value1);
    value = dataArr[1];
    
    if (dataArr[0]==="spotify-this-song")
      {
        spotify_this_song();
      } 
      else if (dataArr[0]==="movie-this")
      {
        movie_this();
      }
      else
      {
        my_tweets();
      };
  });
}

