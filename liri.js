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
        console.log('UNDER CONSTRUCTION');
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

spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log('ERROR');
  });

// ALL FUNCTIONS:
// ************* //

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



