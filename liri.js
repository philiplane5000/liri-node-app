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

//PREVENT APPEND LOG OF 'UNDEFINED' IN THE CASE OF NO INPUT E.G. 'MY-TWEETS':
(input === undefined) ? appendLog(command) : appendLog(command, input)

//HARD-CODED (MAYBE LATER USE THE INQUIRER TO GATHER AND SET USER SCREEN NAME?)
let twitterScreenName = 'MrPotat58309442';

mainSwitch(command, input)

// ****ALL FUNCTIONS:**** //
// ********************** //

//APPEND TO 'LOG.TXT' + CONSOLE.LOG(INPUTS):
function appendLog(...inputs) {

    for (input of inputs) {
        //APPEND TO LOG:
        fs.appendFile('./log.txt', '\n' + input, function (err) {
            if (err) throw err;
            // console.log('LOGGED');
        })
        //LOG TO CONSOLE:
        console.log(input);

    }
}

// MAIN SWITCH STATEMENT: (SWITCH DETERMINED BY COMMAND + INPUT)
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

//TWITTER GET & TWITTERLOG-CALLBACK:
function twitterGet(screenName, callback) {

    client.get('statuses/user_timeline', { screen_name: screenName }, callback);
}

function twitterLog(err, tweets, res) {

    if (!err) {
        tweets.forEach(function (tweet) {
            appendLog(`${tweet.text}\nSHARED ON: ${tweet.created_at}`);
        })

    } else {
        throw err
    }

}

//SPOTIFY SEARCH BY TRACK:
function spotifyThis(trackName) {

    spotify.search({ type: 'track', query: trackName, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        appendLog(`ARTIST NAME:\n"${data.tracks.items[0].artists[0].name}" `);
        appendLog(`SONG NAME:\n"${data.tracks.items[0].name}"`);
        appendLog(`ALBUM:\n"${data.tracks.items[0].album.name}"`);
        appendLog(`PREVIEW LINK:\n"${data.tracks.items[0].external_urls.spotify}"`)

    });
}

//MOVIE-THIS REQUEST FUNCTION:
function requestMovieTitle(movieTitle) {

    let baseURL = 'http://www.omdbapi.com/?apikey=trilogy&t='
    let queryURL = baseURL.concat(movieTitle);
    appendLog(queryURL);

    //REQUEST QUERY USING QUERYURL:
    request(queryURL, function (err, res, body) {

        //NEED TO INCLUDE HERE OR ABOVE, 'MR.NOBODY' AS SEARCH PARAM IF USER DOESN'T SUPPLY MOVIE NAME(!) i.e. NO INPUT or INPUT = undefined

        if (!(err)) {
            if (body.includes('Movie not found!')) {
                appendLog('MOVIE NOT FOUND, PLEASE TRY ANOTHER TITLE');
                return;
            }
            let data = JSON.parse(body);
            // appendLog(data)
            appendLog(`TITLE:\n${data.Title}`);
            appendLog(`RELEASE YEAR:\n${data.Year}`);
            appendLog(`IMDB RATING:\n${data.imdbRating}`);
            appendLog(`ROTTEN TOMATOES RATING:\n${data.Ratings[1].Value}`)
            appendLog(`RELEASED IN: (COUNTRY)\n${data.Country}`)
            appendLog(`LANGUAGE:\n${data.Language}`)
            appendLog(`PLOT:\n${data.Plot}`)
            appendLog(`ACTORS:\n${data.Actors}`)
            return
        }
        appendLog(err)
    });
}

//DO WHAT IT SAYS USING A FILE-NAME
function doWhatItSays(fileName) {

    fs.readFile(fileName, 'utf-8', function (err, data) {
        if (!err) {

            let fileString = JSON.stringify(data);

            if (fileString.includes(',')) {

                let dataArr = fileString.split(',');
                let commandAlt = dataArr[0].trim().slice(1);
                let sliceOne = dataArr[1].trim().slice(2);
                let sliceTwo = sliceOne.slice(0, sliceOne.length - 3);
                let inputAlt = sliceTwo;
                appendLog(`${fileName}:`)
                appendLog(`COMMAND: ${commandAlt}`);
                appendLog(`INPUT: ${inputAlt}`);

                mainSwitch(commandAlt, inputAlt);
                return
            }

            let commandWithQuotations = fileString.trim()
            let sliceOne = commandWithQuotations.slice(1);
            let sliceTwo = sliceOne.slice(0, sliceOne.length - 1);
            let commandAlt = sliceTwo;
            mainSwitch(commandAlt)

        }

    });
}