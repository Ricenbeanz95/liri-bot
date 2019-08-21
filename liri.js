require("dotenv").config();
var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var bandsintown = require('bandsintown')("codingbootcamp");

var parameter = []

console.log(bandsintown.getArtistEventList("cage the elephant"))

for (let a = 3; a < process.argv.length; a++) {
    parameter.push(process.argv[a]);
    parameter.toString();

}
console.log(parameter)

var axios = require("axios");
if (process.argv[2] === "movie-this") {


    axios.get("http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=" + keys.OMDB).then(
        function (response) {
            console.log("Title:" + response.data.Title)
            console.log("------------------")
            console.log("Year:" + response.data.Year);
            console.log("------------------")
            console.log("imdbRating:" + response.data.imdbRating)
            console.log("------------------")
            console.log(response.data.Ratings[1].Source + ":" + response.data.Ratings[1].Value)
            console.log("------------------")
            console.log("Country:" + response.data.Country)
            console.log("------------------")
            console.log("Language(s)" + response.data.Language)
            console.log("------------------")
            console.log("Plot:" + response.data.Plot)
            console.log("------------------")
            console.log("Actor(s)" + response.data.Actors)
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

if (process.argv[2] === "spotify-this-song") {


    spotify.search({ type: 'track', query: parameter }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (let i = 0; i < data.tracks.items.length; i++) {
            console.log("album: " + (data.tracks.items[i].album.name))
            console.log("song: " + (data.tracks.items[i].name));
            console.log("")
            for (let j = 0; j < data.tracks.items[i].artists.length; j++) {

                console.log("artist: " + (data.tracks.items[i].artists[j].name))
            }
            console.log("-----------")
            // if (condition) {


            //     console.log("30 second preview: " + (data.tracks.items[i].preview_url))
            //     console.log("---------")
            // }



        }
        // console.log(data.tracks.items[0].name);
    });

}

