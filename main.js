const app = require('./liri');
const inquirer = require('inquirer');

//CHECK LIRI CONNECTION:
app.liri.connected();

runLiri();

function runLiri() {

    inquirer.prompt([
        {
            message: "Select a LIRI command:",
            type: "checkbox",
            name: "command",
            choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says']
        },{
            name: "twitterScreenName",
            message: "What is your Twitter Screen Name?"
        }, {
            name: "input",
            message: "Enter Liri Input:"
        }
    ]).then(function (answers) {
        //USER INPUT:
        app.liri.twitterScreenName = answers.twitterScreenName;
        let command = answers.command[0];
        let input = answers.input;

        //PREVENT APPEND LOG OF 'UNDEFINED' IN THE CASE OF NO INPUT E.G. 'MY-TWEETS':
        (input === undefined) ? app.liri.appendLog(command) : app.liri.appendLog(command, input)
        //RUN LIRI USING INQUIRER INPUTS:
        app.liri.mainSwitch(command, input)

    });

}




