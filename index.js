/**
 * Created by tvankada on 9/27/17.
 */
var request = require('request');
var schedule = require('node-schedule');
var constants = require('./constants');


var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

console.log(constants.SERVER_URL);
function execute() {
    request({
        uri: constants.SERVER_URL,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        rejectUnauthorized: false,
        requestCert: false,
        agent: false
    }, function(error, response, roomStatus) {
        roomStatus = JSON.parse(roomStatus);
        if (roomStatus.status === 'Busy') {
            console.log(roomStatus.status);
            exec("t2 run /Users/tvankada/tessel-code/index.js", puts);
        } else  if (roomStatus.status === 'Free') {
            console.log(roomStatus.status);
            exec("t2 run /Users/tvankada/tessel-code/index2.js", puts);
        }
    });
}
execute();
// Code to run the execute function every 1 minute
var j = schedule.scheduleJob('/10 * * * * *', function(){
    execute();
});
