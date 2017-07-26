var request = require('request');
var twitter = require('twitter');
var fs = require('fs');
var key = require('./keys.js');
function tweet(){
  var client = new twitter({
    consumer_key: key.twitterKeys.consumer_key,
    consumer_secret: key.twitterKeys.consumer_secret,
    access_token_key: key.twitterKeys.access_token_key,
    access_token_secret: key.twitterKeys.access_token_secret
    });
    client.get('statuses/user_timeline', {count: 5}, function(error, tweets, response){
    if (!error) {
      console.log(error);
    }
    console.log("------------------------------------------");
    console.log("Here are your last 5 tweets:");
    console.log('');
    for(var i = 0; i<tweets.length;i++){
      console.log(tweets[i].text);
      console.log("");
    }
    console.log("------------------------------------------");
  });
}
function movie(title) {
  request("http://www.omdbapi.com/?apikey=40e9cece&t="
+title, function (err, data) {
    if (err !== null) {
      console.log("cant find the movie")
    }
    var info = JSON.parse(data.body);
    console.log("------------------------------------------");
    console.log("Movie title: "+ info.Title);
    console.log('');
    console.log("Year made: " + info.Year);
    console.log('');
    console.log("IMDB Rating: "+ info.imdbRating);
    console.log('');
    console.log("Country: " + info.Country);
    console.log('');
    console.log("Language: " + info.Language);
    console.log('');
    console.log("Plot: " + info.Plot);
    console.log('');
    console.log("Actors: "+ info.Actors);
    console.log('');
    console.log('Rotten tomatoes rating: '+info.tomatoUserRating);
    console.log("------------------------------------------");
    file =
    fs.appendFile('./changeLog.txt', "\nmovie title: "+ info.Title + ", Year Made: " + info.Year + ", IMDB Rating: "+ info.imdbRating, function(err){
      if(err){
        console.log(err);
      }
    });
  });
}

switch (process.argv[2]) {
    case 'my-tweets':
      tweet();
    break;
    case 'movie-this':
      movie(process.argv[3]);
    break;
    case 'say-what-i-did':
      fs.readFile("./random.txt", "utf8", function(err, data){
        if(err){
          console.log("an error has occured: "+err);
        }
        var parsedData = data.trim().split(',');
        for (var i = 0; i < parsedData.length; i++){
            switch(parsedData[i]) {
              case "my-tweets":
                tweet();
              break;
              case 'spotify-this-song':
                music(parsedData[i+1]);
              break;
              case 'movie-this':
                movie(parsedData[i+1]);
              break;
            }
        }
      });
    break;
}
