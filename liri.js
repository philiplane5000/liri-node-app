const result = require("dotenv").config();
const keys = require("./keys");
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');

//AUTHENTICATE USER:
// let spot = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let spotify = new Spotify(keys.spotify);

//USER INPUT:
let command = process.argv[2];
let input = process.argv[3];

//HARD-CODED (MAYBE LATER USE THE INQUIRER THING TO GATHER AND SET USER SCREEN NAME?)
let twitterScreenName = 'MrPotat58309442';

// MAIN SWITCH STATEMENT (SWITCH DETERMINED BY COMMAND + INPUT):    //
// ************************* //

mainSwitch(command, input)

function mainSwitch(command, input) {

    switch (command) {
        case 'my-tweets':
            twitterGet(twitterScreenName, twitterLog);
            break;
        case 'spotify-this-song':
            spotifyThis(input);
            break;
        case 'movie-this':
            requestMovieTitle(input);
            break;
        case 'do-what-it-says':
            doWhatItSays('./random.txt');
            break;
        default:
            console.log(`Sorry, unable to process: '${command}'`);
    }

}


// SANDBOX:
// *********** //




// ALL FUNCTIONS: //
// ************** //

//TWITTER FUNCTIONS:
function twitterGet(screenName, callback) {
    
    client.get('statuses/user_timeline', { screen_name: screenName }, callback);
}

function twitterLog(error, tweets, response) {

    if (!error) {
        tweets.forEach(function (tweet) {
            console.log('******************');
            console.log(tweet.text);
            console.log(` ^ SHARED ON: ${tweet.created_at}`);
            console.log('******************');
        })

    } else {
        throw error
    }

}

//SPOTIFY SEARCH BY TRACK:
function spotifyThis(trackName) {

    spotify.search({ type: 'track', query: trackName, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(`ARTIST NAME:\n"${data.tracks.items[0].artists[0].name}" `);
        console.log(`SONG NAME:\n"${data.tracks.items[0].name}"`);
        console.log(`ALBUM:\n"${data.tracks.items[0].album.name}"`);
        console.log(`PREVIEW LINK:\n"${data.tracks.items[0].external_urls.spotify}"`)

    });
}

//MOVIE-THIS REQUEST FUNCTION:
function requestMovieTitle(movieTitle) {

    let baseURL = 'http://www.omdbapi.com/?apikey=trilogy&t='
    let queryURL = baseURL.concat(movieTitle);
    console.log(queryURL);

    //REQUEST QUERY USING QUERYURL:
    request(queryURL, function (error, response, body) {

        //NEED TO INCLUDE HERE OR ABOVE, 'MR.NOBODY' AS SEARCH PARAM IF USER DOESN'T SUPPLY MOVIE NAME(!) i.e. NO INPUT or INPUT = undefined

        if (!(error)) {
            if (body.includes('Movie not found!')) {
                console.log('MOVIE NOT FOUND, PLEASE TRY ANOTHER TITLE');
                return;
            }
            let data = JSON.parse(body);
            // console.log(data)
            console.log(`TITLE:\n${data.Title}`);
            console.log(`RELEASE YEAR:\n${data.Year}`);
            console.log(`IMDB RATING:\n${data.imdbRating}`);
            console.log(`ROTTEN TOMATOES RATING:\n${data.Ratings[1].Value}`)
            console.log(`RELEASED IN: (COUNTRY)\n${data.Country}`)
            console.log(`LANGUAGE:\n${data.Language}`)
            console.log(`PLOT:\n${data.Plot}`)
            console.log(`ACTORS:\n${data.Actors}`)
            return
        }
        console.log(error)
    });
}

function doWhatItSays(fileName) {

    fs.readFile(fileName, 'utf-8', function (err, data) {
        if (!err) {
            let fileString = JSON.stringify(data);
            let dataArr = fileString.split(',');
            let commandAlt = dataArr[0].trim().slice(1);
            let sliceOne = dataArr[1].trim().slice(2);
            let sliceTwo = sliceOne.slice(0, sliceOne.length - 3);
            let inputAlt = sliceTwo;
            console.log(`${fileName}:`)
            console.log(`COMMAND: ${commandAlt}`);
            console.log(`INPUT: ${inputAlt}`);

            mainSwitch(commandAlt, inputAlt);

        }

    });
}