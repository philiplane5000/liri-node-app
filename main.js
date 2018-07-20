const app = require('./liri');
const inquirer = require('inquirer');

//CHECK LIRI CONNECTION:
app.liri.connected();

runLiri();

//MAIN FUNCTION TO DETERMINE COMMAND FOR LIRI.JS:
function runLiri() {

    inquirer.prompt([
        {
            message: "Select a LIRI command:",
            type: "list",
            name: "command",
            choices: ['get-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says']
        }
    ]).then(function (answers) {
        //USER INPUT:
        let command = answers.command;
        // let input = answers.input;
        switch (command) {
            case 'get-tweets':
                twitterReq();
                break;
            case 'spotify-this-song':
                spotifyReq();
                break;
            case 'movie-this':
                omdbReq();
                break;
            case 'do-what-it-says':
                app.liri.mainSwitch('do-what-it-says', '-');
                break;
            default:
        }
    });
}

//GATHER FURTHER INFORMATION FROM USER FUNCTIONS:
//===============================================//

function omdbReq() {
    inquirer.prompt([
        {
            message: "Enter movie name:",
            type: "input",
            name: "movie"
        }
    ]).then(function (answer) {
        //WITHOUT TITLE, DEFAULT TO MR.NOBODY:
        if (answer.movie === undefined || answer.movie === null || answer.movie.length === 0) {
            answer.movie = 'mr.nobody';
        }
        app.liri.mainSwitch('movie-this', answer.movie);
    })
}

function spotifyReq() {
    inquirer.prompt([
        {
            message: "Enter track/song name:",
            type: "input",
            name: "track"
        }
    ]).then(function (answer) {
        //WITHOUT TITLE, DEFAULT TO AMISH PARADISE:
        if (answer.track === undefined || answer.track === null || answer.track.length === 0) {
            answer.track = 'amish paradise';
        }
        app.liri.mainSwitch('spotify-this-song', answer.track);
    })
}

function twitterReq() {
    inquirer.prompt([
        {
            message: "Enter your Twitter Screen Name:",
            type: "input",
            name: "twitterScreenName"
        }
    ]).then(function (answer) {
        //WITHOUT TITLE, DEFAULT TO @ALYANKOVIC:
        if (answer.twitterScreenName === undefined || answer.twitterScreenName === null || answer.twitterScreenName.length === 0) {
            answer.twitterScreenName = 'AlYankovic';
        }
        //ELSE SET TWITTER SCREEN NAME ACCORDING TO USER-INPUT:
        app.liri.twitterScreenName = answer.twitterScreenName;
        app.liri.mainSwitch('get-tweets', '-');
    })
}

//EXPORT PROMPT USER TO LIRI: (THIS WILL RUN AFTER RESULTS ARE LOGGED)
module.exports.promptUser = function () {
    inquirer.prompt([
        {
            message: "Submit another command to LIRI?",
            name: "restart",
            type: "confirm"
        }
    ]).then(function (answer) {
        (answer.restart) ? runLiri() : console.log('GOODBYE!');
    })
}
//==========END-MAIN.JS==============//