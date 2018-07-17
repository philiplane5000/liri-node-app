const result = require("dotenv").config();
const keys = require("./keys");
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

//AUTHENTICATE USER:
// let spot = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let spotify = new Spotify(keys.spotify);

//USER INPUT:
let command = process.argv[2];
let input = process.argv[3];

// MAIN SWITCH STATEMENT:    //
// ************************* //
switch (command) {
    case 'my-tweets':
        //TWITTER GET PATH:
        // client.get(path, params, callback);
        client.get('statuses/user_timeline', { screen_name: 'MrPotat58309442' }, twitterLog);
        break;
    case 'spotify-this-song':
        spotifyThis(input);
    break;
    case 'movie-this':
        console.log('UNDER CONSTRUCTION');
        break;
    default:
        console.log('DEFAULT ACTION');
    // console.log(`Sorry, unable to process: '${command}'`);
}

// SANDBOX:
// *********** //

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



// ALL FUNCTIONS: //
// ************** //

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



