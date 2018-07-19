const app = require('./liri');

//CHECK LIRI CONNECTION:
app.liri.connected();

//USER INPUT:
let command = process.argv[2];
let input   = process.argv[3];

//PREVENT APPEND LOG OF 'UNDEFINED' IN THE CASE OF NO INPUT E.G. 'MY-TWEETS':
(input === undefined) ? app.liri.appendLog(command) : app.liri.appendLog(command, input)

//RUN LIRI:
app.liri.mainSwitch(command, input)

