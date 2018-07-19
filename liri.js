const result = require('dotenv').config();
const keys = require('./keys');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');

let client = new Twitter(keys.twitter);
let spotify = new Spotify(keys.spotify);

// ****LIRI OBJ OF ALL FUNCTIONS:**** //
// ********************************* //

module.exports.liri = {

    twitterScreenName: 'MrPotat58309442',

    connected: function () {
        console.log('CONNECTED TO LIRI');
    },

    mainSwitch: function (command, input) {
        switch (command) {
            case 'my-tweets':
                exports.liri.twitterGet(exports.liri.twitterScreenName, exports.liri.twitterLog);
                break;
            case 'spotify-this-song':
                exports.liri.spotifyThis(input);
                break;
            case 'movie-this':
                exports.liri.requestMovieTitle(input);
                break;
            case 'do-what-it-says':
                exports.liri.doWhatItSays('./random.txt');
                break;
            default:
            exports.liri.appendLog(`SORRY, UNABLE TO PROCESS: '${command}'`);
        }
    },
    twitterGet: function (screenName, callback) {
        client.get('statuses/user_timeline', { screen_name: screenName }, callback);

    },
    twitterLog: function (err, tweets, res) {

        if (!err) {
            tweets.forEach(function (tweet) {
                exports.liri.appendLog(`${tweet.text}\nSHARED ON: ${tweet.created_at}`);
            })

        } else {
            throw err
        }

    },
    spotifyThis: function (trackName) {

        if (trackName === null || trackName === undefined) {
            trackName = "inspector norse";
        }

        spotify.search({ type: 'track', query: trackName, limit: 1 }, function (err, data) {
            if (err) {
                exports.liri.appendLog('Error occurred: ' + err);
                return
            }
            exports.liri.appendLog(`ARTIST NAME:\n"${data.tracks.items[0].artists[0].name}" `);
            exports.liri.appendLog(`SONG NAME:\n"${data.tracks.items[0].name}"`);
            exports.liri.appendLog(`ALBUM:\n"${data.tracks.items[0].album.name}"`);
            exports.liri.appendLog(`PREVIEW LINK:\n"${data.tracks.items[0].external_urls.spotify}"`)

        });
    },
    requestMovieTitle: function (movieTitle) {

        let baseURL = 'http://www.omdbapi.com/?apikey=trilogy&t='
        let queryURL = baseURL.concat(movieTitle);
        exports.liri.appendLog(queryURL);

        //REQUEST QUERY USING QUERYURL:
        request(queryURL, function (err, res, body) {

            //NEED TO INCLUDE HERE OR ABOVE, 'MR.NOBODY' AS SEARCH PARAM IF USER DOESN'T SUPPLY MOVIE NAME(!) i.e. NO INPUT or INPUT = undefined

            if (!(err)) {
                if (body.includes('Movie not found!')) {
                    exports.liri.appendLog('MOVIE NOT FOUND, PLEASE TRY ANOTHER TITLE');
                    return;
                }
                let data = JSON.parse(body);
                // appendLog(data)
                exports.liri.appendLog(`TITLE:\n${data.Title}`);
                exports.liri.appendLog(`RELEASE YEAR:\n${data.Year}`);
                exports.liri.appendLog(`IMDB RATING:\n${data.imdbRating}`);
                exports.liri.appendLog(`ROTTEN TOMATOES RATING:\n${data.Ratings[1].Value}`)
                exports.liri.appendLog(`RELEASED IN: (COUNTRY)\n${data.Country}`)
                exports.liri.appendLog(`LANGUAGE:\n${data.Language}`)
                exports.liri.appendLog(`PLOT:\n${data.Plot}`)
                exports.liri.appendLog(`ACTORS:\n${data.Actors}`)
                return
            }
            exports.liri.appendLog(err)
        });
    },

    doWhatItSays: function (fileName) {

        fs.readFile(fileName, 'utf-8', function (err, data) {
            if (!err) {

                let fileString = JSON.stringify(data);

                if (fileString.includes(',')) {

                    let dataArr = fileString.split(',');
                    let commandAlt = dataArr[0].trim().slice(1);
                    let sliceOne = dataArr[1].trim().slice(2);
                    let sliceTwo = sliceOne.slice(0, sliceOne.length - 3);
                    let inputAlt = sliceTwo;
                    exports.liri.appendLog(`${fileName}:`)
                    exports.liri.appendLog(`COMMAND: ${commandAlt}`);
                    exports.liri.appendLog(`INPUT: ${inputAlt}`);

                    exports.liri.mainSwitch(commandAlt, inputAlt);
                    return
                }

                let commandWithQuotations = fileString.trim()
                let sliceOne = commandWithQuotations.slice(1);
                let sliceTwo = sliceOne.slice(0, sliceOne.length - 1);
                let commandAlt = sliceTwo;
                exports.liri.mainSwitch(commandAlt)

            }

        });
    },
    appendLog: function (...inputs) {

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


} /*end liri obj*/
